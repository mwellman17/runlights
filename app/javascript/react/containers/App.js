import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import DashboardContainer from './DashboardContainer'
import FixtureIndexContainer from './FixtureIndexContainer'
import NewFixtureForm from './NewFixtureForm'

const App = props => {
  return(

  <Router history={browserHistory}>
    <Route path='/' component={DashboardContainer} />
    <Route path='/fixtures' component={FixtureIndexContainer} />
    <Route path='/fixtures/new' component={NewFixtureForm} />
  </Router>

  )
}

export default App
