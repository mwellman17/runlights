import React, { Component } from 'react'
import FixtureTile from './FixtureTile'
import { Link } from 'react-router';

class FavoritesTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFixtures: true
    }
    this.toggleFixtures = this.toggleFixtures.bind(this)
  }

  toggleFixtures(){
    this.setState({ showFixtures: !this.state.showFixtures })
  }

  render() {

    let addButton
    if (this.props.showForm) {
      addButton = "add-right add-button fas fa-minus"
    } else {
      addButton = "add-right add-button fas fa-plus"
    }

    let fixtures
    if (this.state.showFixtures){
      fixtures = this.props.fixtures.map(fixture => {

        let handleFavorite = () => {
          this.props.handleFavorite(fixture.id)
        }

        return(
          <FixtureTile
            key={fixture.id}
            name={fixture.name}
            manual={fixture.manual}
            weight={fixture.weight}
            wattage={fixture.wattage}
            modes={fixture.mode_list}
            favorite={fixture.favorite}
            handleFavorite={handleFavorite}
            user={this.props.user}
          />
        )
      })
    }

    return(
      <div>
        <div onClick={this.toggleFixtures} className="fixture column panel callout small-12">
        <p>
          FAVORITES
          <i onClick={this.props.newShow} className={addButton}></i>
        </p>
        <ul>
          {fixtures}
        </ul>
        <p><Link className="add-right" to='/fixtures'>Fixture Library</Link></p>
        </div>
      </div>
    )
  }
}

export default FavoritesTile;
