import React, { Component } from 'react'
import { Link } from 'react-router';

class ShowsTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShows: true
    }
    this.toggleShows = this.toggleShows.bind(this)
  }

  toggleShows(){
    this.setState({ showShows: !this.state.showShows })
  }

  render() {

    let addButton
    if (this.props.showForm) {
      addButton = "add-right add-button fas fa-minus"
    } else {
      addButton = "add-right add-button fas fa-plus"
    }

    let shows
    if (this.state.showShows){
      shows = this.props.shows.map(show => {
        return(
          <li key={show.id}><Link to={`/shows/${show.id}`}>{show.name}</Link></li>
        )
      })
    }

    return(
      <div onClick={this.toggleShows} className="fixture column panel callout small-12">
        <p>
          SHOWS
          <i onClick={this.props.newShow} className={addButton}></i>
        </p>
        <ul>
          {shows}
        </ul>
      </div>
    )
  }
}

export default ShowsTile;
