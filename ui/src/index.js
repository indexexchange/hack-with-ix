import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from 'components/App'
import Servers from 'components/Servers'
import Logout from 'components/Logout'

import Container from 'components/Container'

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
      path = "/logout"
      component = { Logout }
    />
	
	<Route
		path = "/form"
		componenent = { Form }
	/>    
    
  </Router>

render(routes, document.getElementById(`root`))
