import React, { Component } from 'react'
import FormTile from '../components/FormTile'
import ModeTile from '../components/ModeTile'

class NewFixtureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      modes: [
        { name: "", footprint: "" }
      ],
      showDetails: false,
      wattage: "",
      weight: "",
      manual: "",
      errors: null,
      success: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.footprintChange = this.footprintChange.bind(this)
    this.modeNameChange = this.modeNameChange.bind(this)
    this.addMode = this.addMode.bind(this)
    this.deleteMode = this.deleteMode.bind(this)
    this.toggleDetails = this.toggleDetails.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.passFixture = this.passFixture.bind(this)
  }

  passFixture(fixture) {
    this.props.passFixture(fixture)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, success: null })
  }

  footprintChange(event, index) {
    let modes = this.state.modes
    modes[index].footprint = event.target.value
    this.setState({ modes: modes })
  }

  modeNameChange(event, index) {
    let modes = this.state.modes
    modes[index].name = event.target.value
    this.setState({ modes: modes })
  }

  addMode(event) {
    event.preventDefault()
    let modes = this.state.modes.concat({ name: "", footprint: "" })
    this.setState({ modes: modes })
  }

  deleteMode(index) {
    let modes = this.state.modes
    modes.splice(index, 1)
    this.setState({ modes: modes })
  }

  toggleDetails(event) {
    event.preventDefault()
    this.setState({ showDetails: !this.state.showDetails })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = (
      {
        name: this.state.name,
        modes: this.state.modes,
        wattage: this.state.wattage,
        weight: this.state.weight,
        manual: this.state.manual,
        user: this.props.user
      }
    )
    fetch("/api/v1/fixtures", {
    method: "POST",
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formPayload)
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
      if(body.error){
        this.setState({ errors: body.error })
      } else {
        this.passFixture(body)
        this.setState({
          name: "",
          modes: [
            { name: "", footprint: "" }
          ],
          showDetails: false,
          wattage: "",
          weight: "",
          manual: "",
          errors: null,
          success: "Fixture added successfully."
        })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    let errors
    if (this.state.errors){
      errors = (
        <p className="error">{this.state.errors}</p>
      )
    }
    let success
    if (this.state.success){
      success = (
        <p className="success">{this.state.success}</p>
      )
    }

    let modes = this.state.modes.map((mode, index) => {
      let handleFootprintChange = (event) => {
        this.footprintChange(event, index)
      }
      let handleModeNameChange = (event) => {
        this.modeNameChange(event, index)
      }
      let handleDelete = () => {
        this.deleteMode(index)
      }
      return(
        <ModeTile
          key={index}
          nameLabel={`Mode ${index + 1} Name`}
          footprintLabel="Footprint"
          name="name"
          footprint="footprint"
          nameValue={mode.name}
          footprintValue={mode.footprint}
          nameChange={handleModeNameChange}
          footprintChange={handleFootprintChange}
          handleDelete={handleDelete}
        />
      )
    })

    let details
    let toggleButton = "Add Details (optional)"
    if (this.state.showDetails) {
      details = (
        <div>
          <FormTile
          key="wattage"
          name="wattage"
          label="Power (watts)"
          value={this.state.wattage}
          type="number"
          handleChange={this.handleChange}
          />
          <FormTile
          key="weight"
          name="weight"
          label="Weight (lbs)"
          value={this.state.weight}
          type="number"
          handleChange={this.handleChange}
          />
          <FormTile
          key="manual"
          name="manual"
          label="Manual"
          value={this.state.manual}
          type="text"
          handleChange={this.handleChange}
          />
        </div>
      )
      toggleButton = "Hide Details"
    }

    return(
      <div>
        <hr/>
        <h2 className="text-center">New Fixture</h2>
        {success}
        <form className="form">
          <FormTile
            key="name"
            name="name"
            label="Fixture Name"
            value={this.state.name}
            type="text"
            handleChange={this.handleChange}
          />
          {modes}
          <div className="new-fixture-button">
            <button onClick={this.addMode}>Add Mode</button>
          </div>
          {details}
          <div className="new-fixture-button">
            <button onClick={this.toggleDetails}>{toggleButton}</button>
          </div>
          <div className="new-fixture-button">
            <button onClick={this.handleSubmit} type="submit" name="submit" id="submit">Submit</button>
          </div>
          {errors}
        </form>
        <hr/>
      </div>
    )
  }
}

export default NewFixtureForm;
