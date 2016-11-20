/*
  By Andrei Patranoiu
*/

// Dependencies

import React, { Component } from 'react'



// Components

import { Center } from 'components/Flex'
import { Row } from 'components/Flex'
import { Navbar } from 'react-bootstrap';



export class MyFooter extends Component {
  constructor () {
    super()
  }

 
  render () {
   
    
    return (
      
    <div style={{marginTop:"100%"}}>
      <nav className="navbar navbar-bottom" style={{backgroundColor: "#4C5F6B"}}  >
      <div className="container-fluid">
      <Center>
        <div className="navbar-header">
          
            <a className="navbar-brand" style={{ color: "white"}}>Team Back-End. Always looking out for your Back-End</a>
         
          
        </div>
       </Center>
   </div>

      </nav>
    </div>

    )
  }
}