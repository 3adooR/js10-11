import React from 'react'
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";

import { HelloWorld } from './components/HelloWorld';

const App = () => <Router>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Hello world</Link>
        </li>
        <li>
          <Link to="/someid">Home + id</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/">
        <HelloWorld />
      </Route>
      <Route>
        <h1>Have no any match 404!</h1>
      </Route>
    </Switch>
  </div>
</Router>

render(<App />, document.getElementById('root'));
