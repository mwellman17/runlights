import React, { Component } from 'react'
import ManufacturerTile from '../components/ManufacturerTile'

class FixtureIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturers: [],
      batch: null
    }
    this.openAll = this.openAll.bind(this)
    this.closeAll = this.closeAll.bind(this)
  }

  componentDidMount(){
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
      this.setState({ manufacturers: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  openAll() {
    this.setState({ batch: true })
  }

  closeAll() {
    this.setState({ batch: false })
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
      <div className="row">
        {manufacturers}
      </div>
      </div>
    )
  }
}

export default FixtureIndexContainer;
