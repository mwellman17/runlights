import React, { Component } from 'react'

class UserFixtureTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      favorite: this.props.favorite
    }
    this.setVisibility = this.setVisibility.bind(this)
    this.toggleFavorite = this.toggleFavorite.bind(this)
  }

  setVisibility(event) {
    event.stopPropagation()
    this.setState({ showDetails: !this.state.showDetails })
  }

  toggleFavorite(event){
    event.stopPropagation()
    this.setState({ favorite: !this.state.favorite })
    this.props.handleFavorite()
  }

  render() {

    let visibility = "hidden"
    let showIcon = (<i className="fas fa-angle-down"></i>)
    if (this.state.showDetails){
      visibility = "visible fixture-list"
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

    let favorite
    if (this.props.user) {
      if (this.state.favorite) {
        favorite = (
          <i onClick={this.toggleFavorite} className="fas fa-heart favorite"></i>
        )
      } else {
        favorite = (
          <i onClick={this.toggleFavorite} className="far fa-heart not-favorite"></i>
        )
      }
    }

    let deleteButton = (
      <i onClick={this.props.handleDelete} className="fas fa-times fixture-delete"></i>
    )

    let editButton = (
      <i onClick={this.props.handleEdit} className="far fa-edit fixture-edit"></i>
    )

    return(
      <li className="fixture-list" onClick={this.setVisibility}>
        {favorite} {this.props.name} {showIcon}
        {deleteButton} {editButton}
        {details}
      </li>
    )
  }
}

export default UserFixtureTile;
