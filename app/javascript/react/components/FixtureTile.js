import React, { Component } from 'react'

class FixtureTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    }
    this.setVisibility = this.setVisibility.bind(this)
  }

  setVisibility(event) {
    event.stopPropagation()
    this.setState({ showDetails: !this.state.showDetails })
  }

  render() {

    let visibility = "hidden"
    let showIcon = (<i className="fas fa-angle-down"></i>)
    if (this.state.showDetails){
      visibility = "visible"
      showIcon = (<i className="fas fa-angle-up"></i>)
    }

    let wattage
    let weight
    let manual

    let modes = this.props.modes
    let modeList = Object.entries(modes).map(mode => {
      return(
        <li key={mode[0]}>{mode.join(' - Ch: ')}</li>
      )
    })

    if (this.props.wattage) {
      wattage = (<li>{this.props.wattage} watts</li>)
    }
    if (this.props.weight){
      weight = (<li>{Math.round(this.props.weight * 2.20462)} lbs</li>)
    }
    if (this.props.manual) {
      manual = <li><a href={this.props.manual} target="_blank">Manual</a></li>
    }

    let details = (
      <ul className={visibility}>
        <li>
          Modes
          <ul>
            {modeList}
          </ul>
        </li>
        <li>
          Details
          <ul>
            {wattage}
            {weight}
            {manual}
          </ul>
        </li>
      </ul>
    )

    return(
      <li onClick={this.setVisibility}>
        {this.props.name} {showIcon}
        {details}
      </li>
    )
  }
}

export default FixtureTile;
