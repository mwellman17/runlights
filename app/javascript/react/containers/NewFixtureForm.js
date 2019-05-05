import React, { Component } from 'react'
import BackButton from '../components/BackButton'

class NewFixtureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return(
      <div>
        <BackButton />
        <h1>User Fixtures</h1>
        <form className="">
          <label htmlFor="field1">field1</label>
          <input type="text" name="field1" id="field1" value="" />
          <label htmlFor="field2">field2</label>
          <input type="text" name="field2" id="field2" value="" />
          <label htmlFor="field3">field3</label>
          <input type="text" name="field3" id="field3" value="" />
          <label htmlFor="field4">field4</label>
          <input type="text" name="field4" id="field4" value="" />
          <input type="submit" name="submit" id="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default NewFixtureForm;
