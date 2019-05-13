import React, { Component } from 'react'
import BackButton from '../components/BackButton'
import NewInstrumentForm from '../components/NewInstrumentForm'
import InstrumentsTable from '../components/InstrumentsTable'

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
    this.renderEditable = this.renderEditable.bind(this);
    this.updateInstrument = this.updateInstrument.bind(this)
  }

  updateInstrument(value, instrument, column) {
    let updatePayload = { value: value, instrument_id: instrument.toString(), column_name: column, show: this.state.show.id }
    fetch(`/api/v1/instruments/${instrument}`, {
      method: 'PUT',
      body: JSON.stringify(updatePayload),
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
      this.setState({ error: body.error })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  renderEditable(cellInfo) {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          this.updateInstrument(
            e.target.innerHTML,
            cellInfo.original.id,
            cellInfo.column.id,
          )}
        }
        dangerouslySetInnerHTML={{
          __html: this.state.instruments[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
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
    let formButton = "Add Instruments"
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

    return(
      <div>
        <BackButton />
        <div>
          <h1 className="text-center">{this.state.show.name}</h1>
          <button className="top-button button-center" onClick={this.toggleForm}>{formButton}</button>
          {instrumentForm}
          <div>
            <InstrumentsTable
              instruments={this.state.instruments}
              renderEditable={this.renderEditable}
              length={500}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ShowPage;
