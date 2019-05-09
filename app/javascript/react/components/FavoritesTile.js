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
        <Link to='/fixtures'>Add a Fixture</Link>
        <div onClick={this.toggleFixtures} className="fixture column panel callout small-12">
        <p>FAVORITES</p>
        <ul>
        {fixtures}
        </ul>
        </div>
      </div>
    )
  }
}

export default FavoritesTile;
