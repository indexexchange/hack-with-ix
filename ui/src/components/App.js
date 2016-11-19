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
<<<<<<< HEAD
      <div style={{width:'100%'}} >
        <Navbar className="#1a237e indigo darken-4" left>
         <NavItem style={{float:'left'}}> <DisplayProfileImage/>  </NavItem>
         <NavItem style={{float:'left'}}> Kanye West </NavItem>
         <NavItem style={{float:'right'}} href='./logout'> Logout </NavItem>
        </Navbar>

        <DDFormat/>
      </div>
=======
      <Navbar className="#1a237e indigo darken-4" left>
           <NavItem style={{float:'left'}}> <DisplayProfileImage/>  </NavItem>
           <NavItem style={{float:'left'}}> Kanye West </NavItem>
           <NavItem style={{float:'right'}} href='./logout'> Logout </NavItem>
      </Navbar>
>>>>>>> bf6d0478cbd96da10b3b95f7383d2f52ae847b8d
    )
  }
}

<<<<<<< HEAD
class DDFormat extends Component {
  render() {
    return (
      <Dropdown color="primary" label="Format">
        <DropdownItem link="#/link1">Video</DropdownItem>
        <DropdownItem>Banner</DropdownItem>
      </Dropdown>
    );
  }
}

class DDPlatform extends Component {
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

class DDLocation extends Component {
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


=======
>>>>>>> bf6d0478cbd96da10b3b95f7383d2f52ae847b8d
class DisplayProfileImage extends Component {
  render () {
    return (
      <div style = {{ width: 55, overflow: 'hidden'}}> 
        <img style = {{ width: '100%', marginTop: 5, borderRadius: '50%' }} src="http://s3.amazonaws.com/hiphopdx-production/2015/12/Kanye-West_12-01-2015.jpg"/>
      </div>
    );
  }
}

