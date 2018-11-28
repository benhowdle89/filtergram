require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bearerToken = require("express-bearer-token");

const api = require("./api");

const app = express();

const requireHTTPS = (req, res, next) => {
  if (
    req.headers["x-forwarded-proto"] !== "https" &&
    process.env.NODE_ENV === "production"
  ) {
    const secureUrl = `https://${req.headers["host"]}${req.url}`;
    res.writeHead(301, { Location: secureUrl });
    res.end();
  }
  next();
};

app.use(requireHTTPS);

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(bearerToken());

const { PORT = 5000 } = process.env;

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/", (req, res) => res.sendStatus(200));
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
