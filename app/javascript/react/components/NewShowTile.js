import React, { useState } from 'react'
import FormTile from './FormTile'
import { Checkbox } from 'antd'

const NewShowTile = ({ userId, handlePayload, show }) => {
  const [name, setName] = useState(show ? show.name : "")
  const [shareable, setShareable] = useState(show ? show.shareable : true)

  const handleSubmit = (event) => {
    event.preventDefault()
    let formPayload = (
      {
        name: name,
        user: userId,
        shareable: shareable
      }
    )
    handlePayload(formPayload)
  }

  return(
    <div>
      <hr/>
      <h2 className="text-center">{ show ? "Edit Show" : "New Show" }</h2>
      <form className="form">
        <FormTile
          key="name"
          name="name"
          label="Show Name"
          value={name}
          type="text"
          handleChange={(e) => setName(e.target.value)}
        />
        <Checkbox defaultChecked={shareable} onChange={(e) => setShareable(e.target.checked)}>
          Allow generated paperwork to be shareable?
        </Checkbox>
        <div className="new-fixture-button">
          <button onClick={handleSubmit} type="submit" name="submit" id="submit">Submit</button>
        </div>
      </form>
      <hr/>
    </div>
  )
}

export default NewShowTile;
