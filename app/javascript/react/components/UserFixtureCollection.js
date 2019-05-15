import React, { Component } from 'react'
import UserFixtureTile from './UserFixtureTile'
import { Link } from 'react-router';

class UserFixtureCollection extends Component {
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

  render() {

    let fixtures
    if (this.state.showFixtures){
      fixtures = this.props.fixtures.map(fixture => {

        let handleFavorite = () => {
          this.props.handleFavorite(fixture.id)
        }

        let handleEdit = (event) => {
          event.stopPropagation()
          this.props.handleEdit(fixture)
        }

        let handleDelete = (event) => {
          event.stopPropagation()
          this.props.handleDelete(fixture)
        }

        return(
          <UserFixtureTile
            key={fixture.id}
            name={fixture.name}
            manual={fixture.manual}
            weight={fixture.weight}
            wattage={fixture.wattage}
            modes={fixture.mode_list}
            favorite={fixture.favorite}
            handleFavorite={handleFavorite}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            user={this.props.user}
          />
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

export default UserFixtureCollection;
