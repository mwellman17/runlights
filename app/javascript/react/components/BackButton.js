import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = () => {
  return(
      <a className="back-button" onClick={browserHistory.goBack}>Back</a>
  )
}

export default BackButton;
