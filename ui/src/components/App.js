// Dependencies

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Components

import { Center } from 'components/Flex'
import ModalG from 'components/ModalG'
import { MyHeader } from 'components/Header.js'
import { MyFooter } from 'components/Footer.js'

export default class App extends Component {
      constructor() {
      super()
    }

    render() {
      return (
        <div style={{width:"100%",height:"100%"}}>
        <MyHeader/>
        <ModalG/>
        <MyFooter/>
        </div>
      )
    }
  }

  
