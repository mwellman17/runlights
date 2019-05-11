import React from 'react';

const TextForm = props => {

  return(
		<div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        onChange={props.handleChange}
        type="text"
        name={props.name}
        id={props.name}
        value={props.value} />
		</div>
  )
}

export default TextForm;
