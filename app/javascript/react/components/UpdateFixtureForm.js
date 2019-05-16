import React, { Component } from 'react'
import TextForm from './TextForm'
import NumberForm from './NumberForm'
import ModeTile from './ModeTile'

class UpdateFixtureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtureDetails: this.props.fixtureDetails,
      showDetails: true,
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
    let fixtureDetails = {...this.state.fixtureDetails}
    fixtureDetails[event.target.name] = event.target.value
    this.setState({ fixtureDetails, success: null })
  }

  footprintChange(event, index) {
    let fixtureDetails = {...this.state.fixtureDetails}
    fixtureDetails.modes[index].footprint = event.target.value
    this.setState({ fixtureDetails })
  }

  modeNameChange(event, index) {
    let fixtureDetails = {...this.state.fixtureDetails}
    fixtureDetails.modes[index].name = event.target.value
    this.setState({ fixtureDetails })
  }

  addMode(event) {
    event.preventDefault()
    let fixtureDetails = {...this.state.fixtureDetails}
    fixtureDetails.modes = this.state.fixtureDetails.modes.concat({ name: "", footprint: "" })
    this.setState({ fixtureDetails })
  }

  deleteMode(index) {
    let fixtureDetails = {...this.state.fixtureDetails}
    fixtureDetails.modes.splice(index, 1)
    this.setState({ fixtureDetails })
  }

  toggleDetails(event) {
    event.preventDefault()
    this.setState({ showDetails: !this.state.showDetails })
  }

  handleSubmit(event) {
    event.preventDefault()
    let formPayload = (
      {
        fixtureDetails: this.state.fixtureDetails,
        user: this.props.user
      }
    )
    fetch(`/api/v1/fixtures/${this.state.fixtureDetails.id}`, {
    method: "PATCH",
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
        this.props.confirmUpdate(body.fixture)
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

    let modes = this.state.fixtureDetails.modes.map((mode, index) => {
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
          <NumberForm
          key="wattage"
          name="wattage"
          label="Power (watts)"
          value={this.state.fixtureDetails.wattage}
          handleChange={this.handleChange}
          />
          <NumberForm
          key="weight"
          name="weight"
          label="Weight (lbs)"
          value={this.state.fixtureDetails.weight}
          handleChange={this.handleChange}
          />
          <TextForm
          key="manual"
          name="manual"
          label="Manual"
          value={this.state.fixtureDetails.manual}
          handleChange={this.handleChange}
          />
        </div>
      )
      toggleButton = "Hide Details"
    }

    return(
      <div>
        <hr/>
        <h2 className="text-center">Update Fixture</h2>
        <form className="form">
          <TextForm
            key="name"
            name="name"
            label="Fixture Name"
            value={this.state.fixtureDetails.name}
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
            <button onClick={this.props.cancelUpdate} type="submit" name="cancel" id="cancel">Cancel</button>
          </div>
          <div className="new-fixture-button">
          <button onClick={this.handleSubmit} type="submit" name="submit" id="submit">Update</button>
          </div>
          {success}
          {errors}
        </form>
        <hr/>
      </div>
    )
  }
}

export default UpdateFixtureForm;
