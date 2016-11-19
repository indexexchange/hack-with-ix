import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from 'components/App'
import Servers from 'components/Servers'
<<<<<<< HEAD
import Logout from 'components/Logout'

=======
import Container from 'components/Container'
>>>>>>> c54ef999afb9f93285af85395e7d447006d37ffa
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
<<<<<<< HEAD

    <Route
      path = "/logout"
      component = { Logout }
    />
=======
    
    
    <Route
	  path = "/container"
	  component = { Container }
	/>
>>>>>>> c54ef999afb9f93285af85395e7d447006d37ffa
  </Router>

render(routes, document.getElementById(`root`))
