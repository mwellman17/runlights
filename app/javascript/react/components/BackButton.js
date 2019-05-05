import React from 'react';
import { browserHistory } from 'react-router'

const BackButton = () => {
  return(
      <a onClick={browserHistory.goBack}>Back</a>
  )
}

export default BackButton;
