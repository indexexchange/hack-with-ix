// Dependencies

import React, { Component } from 'react'

// Components

import { Center } from 'components/Flex'
// 
// function myfunction() {
// 	document.getElementById("myDropdown").classList.toggle("show");
// 	console.log()
// }

export default class Container extends Component {
  constructor () {
    super()
    this.query = "";
  }
	
	

    
  myfunction() {
    if ($(".dropdown-content").attr('id') == "shown") {
    	$(".dropdown-content").attr("id","hidden");
    	$(".dropdown-content").hide();
    } else {
    	$(".dropdown-content").attr("id","shown");
    	$(".dropdown-content").show();
    }
    
 	console.log("jana")
  }
  
  render () {
    return (
    <div className="dropdown">
		<button id="shown" onClick={this.myfunction.bind(this)} className="dropbtn">Dropdown</button>
  		<div id="myDropdown" style={{display:'none'}} className="dropdown-content">
    		<a href="#home">Home</a>
    		<a href="#about">About</a>
    		<a href="#contact">Contact</a>
  		</div>
	</div>
	)
  }
}
