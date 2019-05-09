import React, { Component } from 'react'
import FormTile from './FormTile'

class NewShowTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, success: null })
  }

  handleSubmit(event){
    event.preventDefault()
    let formPayload = (
      {
        name: this.state.name,
        user: this.props.userId
      }
    )
    this.props.handlePayload(formPayload)
  }

  render() {

    return(
      <div>
        <hr/>
        <h2 className="text-center">New Show</h2>
        <form className="form">
          <FormTile
            key="name"
            name="name"
            label="Show Name"
            value={this.state.name}
            type="text"
            handleChange={this.handleChange}
          />
          <div className="new-fixture-button">
            <button onClick={this.handleSubmit} type="submit" name="submit" id="submit">Submit</button>
          </div>
        </form>
        <hr/>
      </div>
    )
  }
}

export default NewShowTile;
