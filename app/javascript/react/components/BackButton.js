import React from 'react';
import { useHistory } from 'react-router-dom'

const BackButton = () => {
  const history = useHistory();

  return(
      <a className="back-button" onClick={() => history.goBack()}>Back</a>
  )
}

export default BackButton;
