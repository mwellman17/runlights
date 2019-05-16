import React, { Component } from 'react'
import { Link } from 'react-router';
import alertify from 'alertifyjs'
import ManufacturerTile from '../components/ManufacturerTile'
import UserFixtureCollection from '../components/UserFixtureCollection'
import NewFixtureForm from '../components/NewFixtureForm'
import UpdateFixtureForm from '../components/UpdateFixtureForm'
import BackButton from '../components/BackButton'

class FixtureIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
      batch: null,
      searchString: "",
      showFixtureForm: false,
      user: null,
      userFixtures: [],
      error: null,
      updateFixtureDetails: null,
      success: null
    }
    this.openAll = this.openAll.bind(this)
    this.closeAll = this.closeAll.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.fetchFixtures = this.fetchFixtures.bind(this)
    this.toggleFixtureForm = this.toggleFixtureForm.bind(this)
    this.passFixture = this.passFixture.bind(this)
    this.handleFavorite = this.handleFavorite.bind(this)
    this.searchFetch = this.searchFetch.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.confirmUpdate = this.confirmUpdate.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)
  }

  fetchFixtures() {
    fetch('/api/v1/fixtures', { credentials: 'same-origin' })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(body => {
      let current_user = ""
      if (body.user_id) {
        current_user = body.user_id
      }
      this.setState({
        manufacturers: body.manufacturers,
        searchString: "",
        batch: false,
        user: current_user,
        userFixtures: body.user_fixtures
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  componentDidMount(){
    this.fetchFixtures()
  }

  openAll() {
    this.setState({ batch: true })
  }

  closeAll() {
    this.setState({ batch: false })
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange(event) {
    clearTimeout(this.timer);
    let newSearchString = event.target.value
    this.setState({ searchString: newSearchString })

    this.timer = setTimeout(
      function() {
        this.searchFetch(newSearchString)
      }
      .bind(this),
      650
    );
  }

  searchFetch(searchString) {
    if (searchString == ""){
      this.fetchFixtures()
    } else {
      const body = JSON.stringify({
        search_string: searchString
      })
      fetch('/api/v1/fixtures/search.json', {
        method: 'POST',
        body: body,
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ manufacturers: body, batch: true })
      })
    }
  }

  handleClear(event) {
    event.preventDefault()
    this.fetchFixtures()
  }

  toggleFixtureForm(){
    this.setState({ showFixtureForm: !this.state.showFixtureForm })
  }

  passFixture(fixture) {
    fixture.favorite = true
    let userFixtures = this.state.userFixtures.concat(fixture)
    userFixtures = userFixtures.sort(function(a, b){
      let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
      if (nameA < nameB)
        return -1
      if (nameA > nameB)
        return 1
      return 0
    })
    this.setState({ userFixtures: userFixtures })
  }

  handleFavorite(fixtureId){
    const body = JSON.stringify({
      fixture_id: fixtureId,
      user_id: this.state.user
    })
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

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleEdit(fixture) {
    for (let property in fixture) {
      if (fixture.hasOwnProperty(property)) {
        if (fixture[property] === null) {
          fixture[property] = ""
        }
      }
    }
    this.setState({ updateFixtureDetails: fixture })
  }

  confirmUpdate(fixture) {
    let userFixtures = this.state.userFixtures
    let item = userFixtures.filter(oldFixture => oldFixture.id === fixture.id)
    let index = userFixtures.indexOf(item[0])
    userFixtures.splice(index, 1, fixture)
    this.setState({
      userFixtures: userFixtures,
      updateFixtureDetails: null,
      success: "Fixture updated successfully"
    })
    setTimeout(
      function() {
        this.setState({ success: null });
      }
      .bind(this),
      3000
    );
  }

  cancelUpdate(event) {
    event.preventDefault()
    this.setState({ updateFixtureDetails: null })
  }

  confirmDelete(fixture) {
    alertify.defaults.transition = 'none'
    alertify.defaults.glossary = {
      ok: 'Yes',
      cancel: 'Cancel'
    }

    let handleDelete = () => {
      this.handleDelete(fixture)
    }

    if (fixture.instrument_count === 0) {
      alertify.confirm(`Delete ${fixture.name}`, `Are you sure you want to delete ${fixture.name}? This action cannot be undone.`, handleDelete, null).set('defaultFocus', 'cancel')
    } else {
      let shows = fixture.show_names
      let showNames
      if (shows.length === 1) {
        showNames = shows[0]
      } else {
        showNames = [shows.slice(0, -1).join(', '), shows.slice(-1)[0]].join(shows.length < 3 ? ' and ' : ', and ')
      }
      alertify.confirm(`Delete ${fixture.name}`, `WARNING: This fixture is in use in ${showNames}. Clicking YES will delete ${fixture.instrument_count} instance(s) of this fixture. This action cannot be undone.`, handleDelete, null).set('defaultFocus', 'cancel')
    }
  }

  handleDelete(fixture) {
    let payload = { fixture_id: fixture.id }
    let userFixtures = this.state.userFixtures
    fetch(`/api/v1/fixtures/${fixture.id}`, {
      method: 'DELETE',
      body: JSON.stringify(payload),
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
      if (body.error){
        this.setState({ error: body.error })
      } else {
        let item = userFixtures.filter(fixture => fixture.id === body.fixture.id)
        let index = userFixtures.indexOf(item[0])
        userFixtures.splice(index, 1)
        this.setState({ userFixtures: userFixtures })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let userFixtures
    if (this.state.userFixtures.length > 0) {
      userFixtures = (
        <UserFixtureCollection
          key="user"
          name="User Fixtures"
          fixtures={this.state.userFixtures}
          batch={true}
          handleFavorite={this.handleFavorite}
          user={this.state.user}
          handleDelete={this.confirmDelete}
          handleEdit={this.handleEdit}
        />
      )
    }

    let manufacturers = this.state.manufacturers.map(manufacturer => {
      return(
        <ManufacturerTile
          key={manufacturer.id}
          name={manufacturer.name}
          fixtures={manufacturer.fixtures}
          batch={this.state.batch}
          handleFavorite={this.handleFavorite}
          user={this.state.user}
        />
      )
    })

    if (manufacturers.length === 0){
      manufacturers = (
        <p className="text-center">Nothing to Show</p>
      )
    }

    let handleOpen = () => {
      this.openAll()
    }
    let handleClose = () => {
      this.closeAll()
    }

    let fixtureForm
    let toggleAdd = "Add a Fixture"
    if (this.state.showFixtureForm) {
      toggleAdd = "Hide Form"
      fixtureForm = (
        <NewFixtureForm
          user={this.state.user}
          passFixture={this.passFixture}
        />
      )
    }
    let newFixtureFormButton = (
      <h3><a>Loading...</a></h3>
    )
    if (this.state.user === ""){
      newFixtureFormButton = (
        <h3><a href='/users/sign_in'>Please Sign In</a></h3>
      )
    } else if (typeof this.state.user === "number") {
      newFixtureFormButton = (
        <h3><a onClick={this.toggleFixtureForm}>{toggleAdd}</a></h3>
      )
    }

    let updateFixtureForm
    if (this.state.updateFixtureDetails) {
      updateFixtureForm = (
        <UpdateFixtureForm
          user={this.state.user}
          fixtureDetails={this.state.updateFixtureDetails}
          confirmUpdate={this.confirmUpdate}
          cancelUpdate={this.cancelUpdate}
        />
      )
    }

    let error
    if (this.state.error) {
      error = (
        <p className="text-center">{this.state.error}</p>
      )
    }

    let success
    if (this.state.success) {
      success = (
        <p className="text-center">{this.state.success}</p>
      )
    }

    return(
      <div>
        <BackButton />
        <div className="fixture-header">
          <h1>Fixture Library</h1>
          <p>These fixtures are provided by the Open Lighting Project's Open Fixture Library (OFL)</p>
          <p>For more information or to contribute, <a href="https://open-fixture-library.org/" target="_blank">visit their website</a>.</p>
          <h3>Don't see the fixture you need?</h3>
          {newFixtureFormButton}
        </div>
        {fixtureForm}
        <div className="button-container row">
          <button className="top-button" onClick={handleOpen}>Expand All</button>
          <button className="top-button" onClick={handleClose}>Collapse All</button>
          <button className="top-button" onClick={this.handleClear}>Clear Search</button>
        </div>
          <form className="search">
            <input type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} placeholder="Search"/>
          </form>
        <div className="row">
          {error}
          {userFixtures}
          {success}
          {updateFixtureForm}
          {manufacturers}
        </div>
      </div>
    )
  }
}

export default FixtureIndexContainer;
