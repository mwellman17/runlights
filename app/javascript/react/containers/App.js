import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import FixtureIndexContainer from './FixtureIndexContainer'
import NewFixtureForm from './NewFixtureForm'

const App = props => {
  return(

  <Router history={browserHistory}>
    <Route path='/fixtures' component={FixtureIndexContainer} />
    <Route path='/fixtures/new' component={NewFixtureForm} />
  </Router>

  )
}

export default App
