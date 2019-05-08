import React, { Component } from 'react'
import ManufacturerTile from '../components/ManufacturerTile'
import { Link } from 'react-router';
import NewFixtureForm from './NewFixtureForm'

class FixtureIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
      batch: null,
      searchString: "",
      showFixtureForm: false,
      user: null,
      userFixtures: null
    }
    this.openAll = this.openAll.bind(this)
    this.closeAll = this.closeAll.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.fetchFixtures = this.fetchFixtures.bind(this)
    this.toggleFixtureForm = this.toggleFixtureForm.bind(this)
    this.passFixture = this.passFixture.bind(this)
  }

  fetchFixtures() {
    fetch('/api/v1/fixtures')
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
      this.setState({
        manufacturers: body.manufacturers,
        searchString: "",
        batch: false,
        user: body.user_id,
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

  handleChange(event) {
    let newSearchString = event.target.value
    this.setState({ searchString: newSearchString })
    const body = JSON.stringify({
      search_string: newSearchString
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

  handleClear(event) {
    event.preventDefault()
    this.fetchFixtures()
  }

  toggleFixtureForm(){
    this.setState({ showFixtureForm: !this.state.showFixtureForm })
  }

  passFixture(fixture) {
    let userFixtures = this.state.userFixtures.concat(fixture)
    this.setState({ userFixtures: userFixtures })
  }

  render() {

    let userFixtures
    if (this.state.userFixtures) {
      userFixtures = (
        <ManufacturerTile
          key="user"
          name="User Fixtures"
          fixtures={this.state.userFixtures}
          batch={this.state.batch}
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
        />
      )
    })

    if (manufacturers.length === 0){
      manufacturers = (
        <p className="no-results text-center">Nothing to Show</p>
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
      <h3><a>Authenticating...</a></h3>
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

    return(
      <div>
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
          {userFixtures}
          {manufacturers}
        </div>
      </div>
    )
  }
}

export default FixtureIndexContainer;
