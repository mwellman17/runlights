import React, { Component } from 'react'
import RunLights from 'images/runlights.png'

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      shows: [],
      user: null
    }
  }

  render() {

    let dashboard
    if (!this.state.user) {
      dashboard = (
        <p>Hello!</p>
      )
    }

    return(
      <div>
        <div className="soon">
          <img src={RunLights} />
          <h1>SOON</h1>
        </div>
      </div>
    )
  }
}

export default DashboardContainer;
