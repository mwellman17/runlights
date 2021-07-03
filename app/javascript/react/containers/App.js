import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage'
import FixtureIndexContainer from './FixtureIndexContainer'
import ShowPage from './ShowPage'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/shows/:id' component={ShowPage} />
        <Route path='/fixtures' component={FixtureIndexContainer} />
        <Route path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
