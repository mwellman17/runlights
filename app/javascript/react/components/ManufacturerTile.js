import React, { Component } from 'react'

class ManufacturerTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFixtures: false
    }
    this.toggleFixtures = this.toggleFixtures.bind(this)
  }

  toggleFixtures(){
    this.setState({ showFixtures: !this.state.showFixtures })
  }

  componentWillReceiveProps(props) {
    this.setState({ showFixtures: props.batch })
  }

  render() {

    let fixtures
    if (this.state.showFixtures){
      fixtures = this.props.fixtures.map(fixture => {
        return(
          <li key={fixture.id}>{fixture.name}</li>
        )
      })
    }

    return(
      <div onClick={this.toggleFixtures} className="fixture column panel callout small-12">
        <p>{this.props.name.toUpperCase()}</p>
        <ul>
          {fixtures}
        </ul>
      </div>
    )
  }
}

export default ManufacturerTile;
