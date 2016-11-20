import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Dropdown from 'lib/react/dropdown'
import DropdownItem from 'lib/react/dropdown-item'

import Input from 'react-materialize';

export default class Dropb extends Component {
  constructor () {
    super()
  }
	
  render() {
		return (
      <div>
			 <DDFormat />
			 <DDPlatform />
			 <DDLocation />
		  </div>
    )
	}
}

export class DDFormat extends Component {
  render() {
    return (
        <Input s={12} type='select' label="Select Format">
          <option value='1'>Video</option>
          <option value='2'>Banner</option>
        </Input>
    );
  }
}

export class DDPlatform extends Component {
  render() {
    return (
        <Input s={12} type='select' label="Select Platform">
          <option value='1'>Laptop</option>
          <option value='2'>Phone</option>
          <option value='3'>Tablet</option>

        </Input>
    );
  }
}

export class DDLocation extends Component {
  render() {
    return (
        <Input s={12} type='select' label="Select Location">
          <option value='1'>North America</option>
          <option value='2'>Europe</option>
          <option value='3'>Australia</option>
          <option value='4'>Asia</option>
          <option value='5'>Africa</option>
        </Input>
    );
  }
}
