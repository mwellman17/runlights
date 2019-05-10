import React, { Component } from 'react'
import FormTile from './FormTile'

const FORMFIELDS = [["quantity", "Quantity", "number"], ["purpose", "Purpose", "text"], ["channel", "Channel", "number"], ["address", "Address", "number"], ["circuit", "Circuit", "text"], ["accessory", "Accessory", "text"], ["color", "Color", "text"], ["gobo", "Gobo", "text"], ["unitNumber", "Unit Number", "number"]]

class NewInstrumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtureValue: "Select a Fixture",
      quantity: 1,
      fixture: "",
      mode: "",
      purpose: "",
      channel: "",
      address: "",
      circuit: "",
      accessory: "",
      color: "",
      gobo: "",
      position: "",
      unitNumber: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFixtureChange = this.handleFixtureChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFixtureChange(event) {
    // this.setState({
    //   fixture: event.fixtureId,
    //   mode: event.modeId,
    //   fixtureValue: event.value
    //  })
  }

  render() {

    let formFields = FORMFIELDS.map(field => {
      return(
        <FormTile
          key={field[0]}
          name={field[0]}
          label={field[1]}
          value={this.state[field[0]]}
          type={field[2]}
          handleChange={this.handleChange}
        />
      )
    })

    let fixtureTree = this.props.fixtures.map(fixture => {
      let modesTree = fixture.modes.map(mode => {
        return(
          <option value={mode.name} key={mode.id}>{`${fixture.name} ${mode.name}`}</option>
        )
      })
      return(
        <optgroup value={fixture.name} key={fixture.id} label={fixture.name} >
          {modesTree}
        </optgroup>
      )
    })

    return(
      <div>
        <hr />
        <h2 className="text-center">Add Instruments</h2>
        <form className="form">
        <label htmlFor="fixtures">Select a Fixture:</label>
          <select id="fixtures">
            <option value="" />
            {fixtureTree}
          </select>
          <div>
            {formFields}
          </div>
        </form>
        <hr/>
      </div>
    )
  }
}

export default NewInstrumentForm;
