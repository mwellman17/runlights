import React, { Component } from 'react'
import FixtureTile from './FixtureTile'

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
          <FixtureTile
            key={fixture.id}
            name={fixture.name}
            manual={fixture.manual}
            weight={fixture.weight}
            wattage={fixture.wattage}
          />
        )
      })
    }

    return(
      <div onClick={this.toggleFixtures} className="fixture column panel callout small-12nd">
        <p>{this.props.name.toUpperCase()}</p>
        <ul>
          {fixtures}
        </ul>
      </div>
    )
  }
}

export default ManufacturerTile;
