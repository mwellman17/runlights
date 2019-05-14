import React, { Component } from 'react'
import TextForm from './TextForm'
import NumberForm from './NumberForm'
import FORMFIELDS from '../constants/Formfields'

class NewInstrumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showId: this.props.show,
      quantity: 1,
      fixtureMode: "",
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = JSON.stringify(this.state)
    this.props.handleForm(formPayload)
  }

  render() {

    let error
    if (this.props.error) {
      error = (
        <p>{this.props.error}</p>
      )
    }

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
          <option value={mode.id} key={mode.id}>{`${fixture.name} ${mode.name} (${mode.footprint}ch)`}</option>
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
        <hr/>
        <h2 className="text-center">Add Instruments</h2>
        <form className="form">
        <label htmlFor="fixtures">Select a Fixture:</label>
          <select onChange={this.handleChange} name="fixtureMode" className="fixture-menu" id="fixtures">
            <option value="" />
            {fixtureTree}
          </select>
          <div>
            {formFields}
          </div>
          <div className="new-fixture-button">
            <button onClick={this.handleSubmit} type="submit" name="submit" id="submit">Submit</button>
          </div>
          {error}
        </form>
        <hr/>
      </div>
    )
  }
}

export default NewInstrumentForm;
