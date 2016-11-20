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

renderModal(){
    
    return(
    	<div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>How would you like to advertise your product ?</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <HandleButton/>
                         </Modal.Body>
                 </Modal.Dialog>
            </div>
    ) 



  }

  hideMod(input, condition, input2){
    



  }



  
    render() {
        return (
        	<div>
            {this.renderModal()}
            </div>
            )
    }
}