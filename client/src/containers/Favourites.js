import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  fetchFavourites,
  addFavourites,
  removeFavourites
} from "./../modules/favourites";

import Nav from "./../components/Nav";
import FeedItem from "./../components/FeedItem";
import { Empty } from "./../components/Empty";
import { Error } from "./../components/Error";
import { Loading } from "./../components/Loading";

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
        <div>
          {fetching && <Loading />}
          {error && <Error>{error}</Error>}
          {!favourites.length && !fetching && (
            <Empty>
              No favourites. Go favourite some posts from your{" "}
              <Link to="/feed">feed</Link>.
            </Empty>
          )}
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
