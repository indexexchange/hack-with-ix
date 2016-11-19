import React from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from 'components/App'
import Servers from 'components/Servers'
<<<<<<< HEAD
import Logout from 'components/Logout'
=======

import Logout from 'components/Logout'

>>>>>>> 8333bf76ad27b5ee7fec17b60cb1071039b1d191
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
<<<<<<< HEAD
=======

>>>>>>> 8333bf76ad27b5ee7fec17b60cb1071039b1d191

    <Route
      path = "/logout"
      component = { Logout }
    />
    
<<<<<<< HEAD
=======
    
    <Route
	  path = "/container"
	  component = { Container }
	/>

>>>>>>> 8333bf76ad27b5ee7fec17b60cb1071039b1d191
  </Router>

render(routes, document.getElementById(`root`))
