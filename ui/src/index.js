import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from 'components/App'
import Servers from 'components/Servers'
import Logout from 'components/Logout'
import Dropb from 'components/Dropb'
import Search from 'components/Search'

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
		path = "/search"
		component = { Search }
	/>    
    
  </Router>

render(routes, document.getElementById(`root`))
