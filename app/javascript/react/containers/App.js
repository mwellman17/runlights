import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import FixtureIndexContainer from './FixtureIndexContainer'

const App = props => {
  return(

  <Router history={browserHistory}>
    <Route path='/fixtures' component={FixtureIndexContainer} />
  </Router>

  )
}

export default App
