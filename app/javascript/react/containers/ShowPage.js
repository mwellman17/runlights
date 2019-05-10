import React, { Component } from 'react'
import BackButton from '../components/BackButton'
import NewInstrumentForm from '../components/NewInstrumentForm'

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      show: {
        name: ""
      },
      instruments: [],
      fixtures: [],
      showForm: false
    }
    this.toggleForm = this.toggleForm.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/shows/${this.props.params.id}`,
      { credentials: 'same-origin' })
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
      this.setState({
        user: body.user.user,
        show: body.show.show,
        fixtures: body.fixtures,
        instruments: body.instruments
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    let instrumentForm
    let formButton = "Show Form"
    if (this.state.showForm) {
      formButton = "Hide Form"
      instrumentForm = (
        <NewInstrumentForm
          fixtures={this.state.fixtures}
        />
      )
    }

    return(
      <div>
        <BackButton />
        <div>
          <h1 className="text-center">{this.state.show.name}</h1>
          <button className="top-button" onClick={this.toggleForm}>{formButton}</button>
          {instrumentForm}
        </div>
      </div>
    )
  }
}

export default ShowPage;
