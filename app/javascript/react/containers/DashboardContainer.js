import React, { Component } from 'react'
import { Link } from 'react-router';
import FavoritesTile from '../components/FavoritesTile'
import ShowsTile from '../components/ShowsTile'
import NewShowTile from '../components/NewShowTile'
import NewFixtureForm from '../components/NewFixtureForm'

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.user_id,
      favorites: this.props.user.favorites,
      shows: this.props.user.shows,
      newShowForm: false,
      newFixtureForm: false,
      errors: null,
      success: null
    }
    this.handleFavorite = this.handleFavorite.bind(this)
    this.newShow = this.newShow.bind(this)
    this.newFixture = this.newFixture.bind(this)
    this.handleNewShow = this.handleNewShow.bind(this)
    this.success = this.success.bind(this)
    this.passFixture = this.passFixture.bind(this)
  }

  success(text) {
    this.setState({ success: `${text} added successfully` })
    setTimeout(
      function() {
        this.setState({ success: null });
      }
      .bind(this),
      3000
    );
  }

  handleNewShow(formPayload){
    let body =
    fetch("/api/v1/shows", {
    method: "POST",
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formPayload)
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
      if(body.error){
        this.setState({ errors: body.error })
      } else {
        let shows = this.state.shows.concat(body.show)
        this.setState({
          shows: shows,
          newShowForm: false,
          errors: null
        })
        this.success("Show")
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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

  newShow(event) {
    event.stopPropagation()
    this.setState({
      newShowForm: !this.state.newShowForm,
      errors: null
    })
  }

  newFixture(event) {
    event.stopPropagation()
    this.setState({
      newFixtureForm: !this.state.newFixtureForm,
      errors: null
    })
  }

  passFixture(fixture) {
    fixture.favorite = true
    let userFixtures = this.state.favorites.concat(fixture)
    this.setState({ favorites: userFixtures })
  }

  render() {

    let errors
    if (this.state.errors){
      errors = (
        <p className="error">{this.state.errors}</p>
      )
    }

    let success
    if (this.state.success){
      success = (
        <p className="success">{this.state.success}</p>
      )
    }

    let newShowTile
    if (this.state.newShowForm){
      newShowTile = (
        <NewShowTile
          key="newShow"
          handlePayload={this.handleNewShow}
          userId={this.state.userId}
        />
      )
    }

    let newFixtureTile
    if (this.state.newFixtureForm){
      newFixtureTile = (
        <NewFixtureForm
          user={this.state.userId}
          passFixture={this.passFixture}
        />
      )
    }


    return(
      <div>
        <h1>Production Dashboard - {this.props.user.username}</h1>
        <ShowsTile
          key="shows"
          shows={this.state.shows}
          user={this.props.user.user_id}
          newShow={this.newShow}
          showForm={this.state.newShowForm}
        />
        {newShowTile}
        {newFixtureTile}
        {success}
        {errors}
        <FavoritesTile
          key="favorites"
          fixtures={this.state.favorites}
          handleFavorite={this.handleFavorite}
          user={this.props.user.user_id}
          newShow={this.newFixture}
          showForm={this.state.newFixtureForm}
        />
      </div>
    )
  }
}

export default DashboardContainer;
