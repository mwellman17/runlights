import React, { Component } from 'react'
import FavoritesTile from '../components/FavoritesTile'
import { Link } from 'react-router';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: this.props.user.favorites
    }
    this.handleFavorite = this.handleFavorite.bind(this)
  }

  handleFavorite(fixtureId){
    const body = JSON.stringify({
      fixture_id: fixtureId,
      user_id: this.props.user.user_id
    })
    let favorites = this.state.favorites
    fetch(`/api/v1/fixtures/${fixtureId}/favorites`, {
    method: "POST",
    body: body,
    credentials: 'same-origin',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
            throw(error);
        }
    })
    .then(response => response.json())
    .then(body => {
      let item = favorites.filter(favorite => favorite.id === body.id)
      let index = favorites.indexOf(item[0])
      favorites.splice(index, 1)
      this.setState({ favorites: favorites })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return(
      <div>
        <h1>Production Dashboard - {this.props.user.username}</h1>
        <FavoritesTile
          key="favorites"
          fixtures={this.state.favorites}
          handleFavorite={this.handleFavorite}
          user={this.props.user.user_id}
        />
      </div>
    )
  }
}

export default DashboardContainer;
