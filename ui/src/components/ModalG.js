// Dependencies

import React, { Component } from 'react'




// Components

import { Center } from 'components/Flex'
import { Modal } from 'react-bootstrap'
import { HandleButton } from './Button.js'




export default class ModalG extends Component {
    constructor(props) {
    super(props);
    this.state = {
      showComponent_mod: true,
    };
  }

renderModal(condition){
    if(condition == true){
    
    	return(
    	
    		<div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>How would you like to advertise your product ?</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <HandleButton hideMod={this.hideMod.bind(this)}/>
                         </Modal.Body>
                 </Modal.Dialog>
            </div>
        )
    	
    } 



  }

  hideMod(input){
    
  	alert("Mystate is: " + input);
  	 this.state.showComponent_mod = false;
     this.forceUpdate();


  }



  
    render() {
        return (
        	<div>
            {this.renderModal(this.state.showComponent_mod)}
            </div>
            )
    }
}