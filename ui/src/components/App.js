// Dependencies

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Dropdown from 'lib/react/dropdown';
import DropdownItem from 'lib/react/dropdown-item';


// Components
import { Navbar, NavItem } from 'react-materialize';

export default class App extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Navbar className="#1a237e indigo darken-4" left>
<<<<<<< HEAD
           <NavItem style={{float:'left'}}> <DisplayProfileImage/>  </NavItem>
=======
           <NavItem style={{float:'left'}}> <DisplayProfileImage/> </NavItem>
>>>>>>> 8333bf76ad27b5ee7fec17b60cb1071039b1d191
           <NavItem style={{float:'left'}}> Kanye West </NavItem>
           <NavItem style={{float:'right'}} href='./logout'> Logout </NavItem>
      </Navbar>
    )
  }
}

class DDFormat extends React.Component {
  render() {
    return (
      <Dropdown color="primary" label="Format">
        <DropdownItem link="#/link1">Video</DropdownItem>
        <DropdownItem>Banner</DropdownItem>
      </Dropdown>
    );
  }
}

class DDPlatform extends React.Component {
  render() {
    return (
      <Dropdown color="primary" label="Platform">
        <DropdownItem link="#/link1">Laptop</DropdownItem>
        <DropdownItem>Tablet</DropdownItem>
      	<DropdownItem>Phone</DropdownItem>
      </Dropdown>
    );
  }
}

class DDLocation extends React.Component {
  render() {
    return (
      <Dropdown color="primary" label="Platform">
        <DropdownItem link="#/link1">North America</DropdownItem>
        <DropdownItem>Europe</DropdownItem>
      	<DropdownItem>Australia</DropdownItem>
      	<DropdownItem>Asia</DropdownItem>
      	<DropdownItem>Africa</DropdownItem>
      </Dropdown>
    );
  }
}


class DisplayProfileImage extends Component {
  render () {
    return (
        <div style = {{ width: 55, overflow: 'hidden'}}> 
          <img style = {{ width: '100%', marginTop: 5, borderRadius: '50%' }} src="http://s3.amazonaws.com/hiphopdx-production/2015/12/Kanye-West_12-01-2015.jpg"/>
        </div>
    );
  }
}

