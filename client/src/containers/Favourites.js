import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Nav from "./../components/Nav";

import {
  fetchFavourites,
  addFavourites,
  removeFavourites
} from "./../modules/favourites";

import FeedItem from "./../components/FeedItem";

class Favourites extends Component {
  componentDidMount() {
    if (!this.props.favourites.favourites.length) this.props.fetchFavourites();
  }
  handleAddFavourites = media => {
    const { addFavourites } = this.props;
    addFavourites(media);
  };
  handleRemoveFavourites = instagram_url_id => {
    const { removeFavourites } = this.props;
    removeFavourites(instagram_url_id);
  };
  render() {
    const {
      favourites: { fetching, error, favourites }
    } = this.props;
    return (
      <div>
        <Nav />
        {fetching && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!favourites.length && !fetching && <p>No favourites</p>}
        {favourites
          .sort((a, b) => {
            return +new Date(b.created_at) - +new Date(a.created_at);
          })
          .map(f => {
            return (
              <FeedItem
                key={f.instagram_url_id}
                media={f.data}
                handleAddFavourites={this.handleAddFavourites}
                handleRemoveFavourites={this.handleRemoveFavourites}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favourites: state.favourites
});

const mapDispatchToProps = {
  fetchFavourites,
  addFavourites,
  removeFavourites
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Favourites)
);
