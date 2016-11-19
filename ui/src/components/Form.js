import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Dropdown from 'lib/react/dropdown';
import DropdownItem from 'lib/react/dropdown-item';

export default Form extends Component {
	render() {
		<div>
			<DDFormat/>
			<DDPlatform/>
			<DDLOcation/>
		</div?>
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
