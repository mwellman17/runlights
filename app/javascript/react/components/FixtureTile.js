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
    if (this.props.wattage) {
      wattage = (<li>{this.props.wattage} watts</li>)
    }
    if (this.props.weight){
      weight = (<li>{Math.round(this.props.weight * 2.20462)} lbs</li>)
    }
    if (this.props.manual) {
      manual = <li><a href={this.props.manual} target="_blank">Link to Manual</a></li>
    }

    let details = (
      <ul className={visibility}>
        {wattage}
        {weight}
        {manual}
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
