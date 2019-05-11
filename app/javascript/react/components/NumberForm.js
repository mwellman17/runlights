import React from 'react';

const FormTile = props => {

  return(
		<div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        onChange={props.handleChange}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        name={props.name}
        id={props.name}
        value={props.value} />
		</div>
  )
}

export default FormTile;
