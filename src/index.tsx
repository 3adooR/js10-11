import React from 'react'
import {render} from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Navigation} from './containers/Nav';
import {Body} from './containers/Body';

const App = () => <Router>
    <Navigation/>
    <Body/>
</Router>

render(<App/>, document.getElementById('root'));
