import React, { Component } from 'react'
import TextForm from './TextForm'
import NumberForm from './NumberForm'
import FORMFIELDS from '../constants/Formfields'

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
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    let formFields = FORMFIELDS.map(field => {
      if (field.number){
        return(
          <NumberForm
            key={field.name}
            name={field.name}
            label={field.label}
            value={this.state[field.name]}
            handleChange={this.handleChange}
        />
        )
      } else {
        return(
          <TextForm
          key={field.name}
          name={field.name}
          label={field.label}
          value={this.state[field.name]}
          handleChange={this.handleChange}
          />
        )
      }
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
          <select className="fixture-menu" id="fixtures">
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
