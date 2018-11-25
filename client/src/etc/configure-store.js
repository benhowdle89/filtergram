import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { save, load } from "redux-localstorage-simple";

import reducers from "./../modules";

import { initialState as initialAuthState } from "./../modules/auth";
import { initialState as initialProfilesState } from "./../modules/profiles";

const PRODUCTION = process.env.NODE_ENV === "production";

const APP_LS_KEY = "filtergram";

const storageStates = [
  "auth.user",
  "auth.token",
  "profiles.usernames",
  "profiles.usernamesById"
];

const configureStore = () => {
  const loggerMiddleware = createLogger();

  const rootReducer = combineReducers({
    ...reducers
  });

  const composeEnhancers =
    (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const middleware = [
    thunkMiddleware,
    save({
      namespace: APP_LS_KEY,
      states: storageStates
    }),
    !PRODUCTION && loggerMiddleware
  ].filter(Boolean);

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createStore(
    rootReducer,
    load({
      namespace: APP_LS_KEY,
      states: storageStates,
      preloadedState: {
        auth: { ...initialAuthState },
        profiles: { ...initialProfilesState }
      },
      disableWarnings: true
    }),
    enhancer
  );

  return store;
};

export default configureStore();
