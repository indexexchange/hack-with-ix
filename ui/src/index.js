import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Dashboard from './pages/Dashboard'
import Presentation from './pages/Presentation'
import Servers from './pages/Servers'
import UnitImpressions from './pages/UnitImpressions'

let routes =
  <Router
    history = { createBrowserHistory() }
  >
    <Route
      path = "/"
      component = { Dashboard }
    />

    <Route
      path = "/presentation"
      component = { Presentation }
    />

    <Route
      path = "/servers"
      component = { Servers }
    />

    <Route
      path = "/unitimpressions"
      component = { UnitImpressions }
    />
  </Router>

render(routes, document.getElementById(`root`))
