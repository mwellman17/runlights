import React, { Component } from 'react'
import ManufacturerTile from '../components/ManufacturerTile'

class FixtureIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
      batch: null,
      searchString: ""
    }
    this.openAll = this.openAll.bind(this)
    this.closeAll = this.closeAll.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchFixtures = this.fetchFixtures.bind(this)
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
      this.setState({ manufacturers: body, searchString: "" })
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
      this.setState({ manufacturers: body })
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.fetchFixtures()
  }

  render() {

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

    let handleOpen = () => {
      this.openAll()
    }
    let handleClose = () => {
      this.closeAll()
    }

    return(
      <div>
        <div className="top-button row">
          <button onClick={handleOpen}>Open All</button>
          <button onClick={handleClose}>Close All</button>
        </div>
          <div className="search-section">
            <form className= "" onSubmit={this.handleSubmit}>
              <input className="" type='text' name='searchString' value={this.state.searchString} onChange={this.handleChange} />
              <input className="" type='submit' value='Clear' />
            </form>
          </div>
        <div className="row">
          {manufacturers}
        </div>
      </div>
    )
  }
}

export default FixtureIndexContainer;
