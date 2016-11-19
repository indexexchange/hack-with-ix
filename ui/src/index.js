import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from 'components/App'
import Servers from 'components/Servers'
import UnitImpressions from 'components/UnitImpressions'

let routes =
  <Router
    history = { createBrowserHistory() }
  >
    <Route
      path = "/"
      component = { App }
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
