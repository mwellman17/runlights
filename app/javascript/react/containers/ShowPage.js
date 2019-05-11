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
      showForm: false,
      error: null
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.handleForm = this.handleForm.bind(this)
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

  handleForm(formPayload) {
    let instruments = this.state.instruments
    fetch("/api/v1/instruments", {
      method: 'POST',
      body: formPayload,
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
            throw(error);
        }
    })
    .then(response => response.json())
    .then(body => {
      if (body.error) {
        this.setState({ error: body.error })
      } else {
        let newInstruments = instruments.concat(body.instruments)
        this.setState({
          instruments: newInstruments,
          showForm: false,
          error: null
        })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let instrumentForm
    let formButton = "Show Form"
    if (this.state.showForm) {
      formButton = "Hide Form"
      instrumentForm = (
        <NewInstrumentForm
          show={this.state.show.id}
          fixtures={this.state.fixtures}
          handleForm={this.handleForm}
          error={this.state.error}
        />
      )
    }

    let instrumentList = this.state.instruments.map(instrument => {
      return(
        <li key={instrument.id}>{`${instrument.fixture.name}: (${instrument.channel}) - ${instrument.address}`}</li>
      )
    })

    return(
      <div>
        <BackButton />
        <div>
          <h1 className="text-center">{this.state.show.name}</h1>
          <button className="top-button" onClick={this.toggleForm}>{formButton}</button>
          <hr/>
          {instrumentForm}
          <div>
            <ul>
            {instrumentList}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowPage;
