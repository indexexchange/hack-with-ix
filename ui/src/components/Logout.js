// Dependencies

import React, { Component } from 'react'

// Components
import { Center } from './Flex';

export default class App extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Center>
        <h1>User Logged out.</h1>
      </Center>
    )
  }
}