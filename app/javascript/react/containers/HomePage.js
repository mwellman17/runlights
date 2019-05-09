import React, { Component } from 'react'
import SignIn from '../components/SignIn'
import DashboardContainer from './DashboardContainer'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount(){
    fetch('/api/v1/current_user', { credentials: 'same-origin' })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => {
      return response.json();
    })
    .then(body => {
      this.setState({ user: body.user })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    let dashboard
    if (this.state.user === null){
      dashboard = <h3>Loading...</h3>
    } else if (this.state.user === false){
      dashboard = <SignIn />
    } else {
      dashboard = <DashboardContainer user={this.state.user}/>
    }


    return(
      <div>
        {dashboard}
      </div>
    )
  }
}

export default HomePage;
