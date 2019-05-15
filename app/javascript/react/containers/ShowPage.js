import React, { Component } from 'react'
import BackButton from '../components/BackButton'
import NewInstrumentForm from '../components/NewInstrumentForm'
import InstrumentsTable from '../components/InstrumentsTable'
import alertify from 'alertifyjs'

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
      error: null,
      showTable: false
    }
    this.toggleForm = this.toggleForm.bind(this)
    this.handleForm = this.handleForm.bind(this)
    this.renderEditable = this.renderEditable.bind(this);
    this.updateInstrument = this.updateInstrument.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
  }

  updateInstrument(value, instrument, column) {
    let updatePayload = { value: value, instrument_id: instrument.toString(), column_name: column, show: this.state.show.id }
    let instruments = this.state.instruments
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
      if (body.error) {
        this.setState({ error: body.error })
      } else {
        let item = instruments.filter(instrument => instrument.id === body.instrument.id)
        let index = instruments.indexOf(item[0])
        instruments.splice(index, 1, body.instrument)
        this.setState({
          instruments: instruments,
          error: null
        })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  renderEditable(cellInfo) {

    let handleTableEvent = event => {
      let numbers = ["unitNumber", "channel", "address"]
      let column = cellInfo.column.id
      let value = event.target.innerHTML
      if (!numbers.includes(column) || parseInt(value) >= 0) {
        this.updateInstrument(
          value,
          cellInfo.original.id,
          column
        )
      } else {
        this.setState({ error: "The last entry must be a number."})
      }
    }

    let handleKeyPress = event => {
      let parent = event.target.parentElement.parentElement.parentElement
      if (event.keyCode === 13 || event.keyCode === 40) {
        event.preventDefault()
        if (parent.nextElementSibling.getElementsByClassName(cellInfo.column.id)[0].children[0].tagName !== "DIV") {
          event.target.blur()
        } else {
          parent.nextElementSibling.getElementsByClassName(cellInfo.column.id)[0].children[0].focus()
        }
      } else if (event.keyCode === 38) {
        event.preventDefault()
        if (!parent.previousElementSibling) {
          event.target.blur()
        } else {
          parent.previousElementSibling.getElementsByClassName(cellInfo.column.id)[0].children[0].focus()
        }
      } else if (event.keyCode === 27) {
        event.preventDefault()
        event.target.blur()
      }
    }

    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleKeyPress}
        onBlur={handleTableEvent}
        dangerouslySetInnerHTML={{
          __html: this.state.instruments[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  confirmDelete(row) {
    alertify.defaults.transition = 'none'
    alertify.defaults.glossary = {
      title:'Instrument Handler',
      ok: 'Yes',
      cancel: 'Cancel'
    }

    let handleDelete = () => {
      this.handleDelete(row)
    }

    alertify.confirm('Are you sure you want to delete this instrument?\nThis action cannot be undone.', handleDelete).set('defaultFocus', 'cancel')
  }

  handleDelete(row) {
    let payload = { instrument_id: row.id }
    let instruments = this.state.instruments
    fetch(`/api/v1/instruments/${row.id}`, {
      method: 'DELETE',
      body: JSON.stringify(payload),
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
      if (body.error){
        this.setState({ error: body.error })
      } else {
        let item = instruments.filter(instrument => instrument.id === body.instrument.id)
        let index = instruments.indexOf(item[0])
        instruments.splice(index, 1)
        this.setState({ instruments: instruments })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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
        instruments: body.instruments,
        showTable: true
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

    let table
    if (this.state.showTable) {
      table = (
        <InstrumentsTable
          layer="Default"
          instruments={this.state.instruments}
          renderEditable={this.renderEditable}
          length={this.state.instruments.length + 5}
          handleDelete={this.confirmDelete}
        />
      )
    }

    let error
    if (this.state.error) {
      error = (
        <p className="text-center">{this.state.error}</p>
      )
    }

    return(
      <div>
        <BackButton />
        <div>
          <h1 className="text-center">{this.state.show.name}</h1>
          <button className="top-button button-center" onClick={this.toggleForm}>{formButton}</button>
          {instrumentForm}
          <div id="react-table">
            {error}
            {table}
          </div>
        </div>
      </div>
    )
  }
}

export default ShowPage;
