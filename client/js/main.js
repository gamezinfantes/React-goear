import React from 'react'
import ReactDOM from 'react-dom'
import { Router, } from 'react-router'
import { createHistory } from 'history'

import Routes from './routes.jsx'



/* create history for router */
let history = new createHistory();

ReactDOM.render((
  <Router history={history} routes={Routes} />
), document.getElementById('app-wrapper'));
