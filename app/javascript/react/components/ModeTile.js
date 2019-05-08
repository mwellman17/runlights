import React from 'react';

const ModeTile = props => {

  return(
		<div className="row">
      <div className="columns small-6">
        <label htmlFor={props.name}>{props.nameLabel}</label>
        <input
        onChange={props.nameChange}
        type="text"
        name={props.name}
        id={props.name}
        value={props.nameValue}
        placeholder="default"
        />
      </div>
      <div className="columns small-4">
        <label htmlFor={props.footprint}>{props.footprintLabel}</label>
        <input
        onChange={props.footprintChange}
        type="number"
        name={props.footprint}
        id={props.footprint}
        value={props.footprintValue}
        placeholder="1"
        />
      </div>
      <div className="delete-mode columns small-2">
        <i onClick={props.handleDelete} className="fas fa-minus-square"></i>
      </div>
		</div>
  )
}

export default ModeTile;
