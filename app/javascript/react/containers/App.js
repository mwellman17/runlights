import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import HomePage from './HomePage'
import FixtureIndexContainer from './FixtureIndexContainer'
import NewFixtureForm from './NewFixtureForm'
import ShowPage from './ShowPage'

const App = props => {
  return(

  <Router history={browserHistory}>
    <Route path='/' component={HomePage} />
    <Route path='/fixtures' component={FixtureIndexContainer} />
    <Route path='/fixtures/new' component={NewFixtureForm} />
    <Route path='/shows/:id' component={ShowPage} />
  </Router>

  )
}

export default App
