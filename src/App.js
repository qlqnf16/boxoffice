import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './routes/Home';
import MovieDetail from './routes/MovieDetail';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/detail/:movieCd" component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
