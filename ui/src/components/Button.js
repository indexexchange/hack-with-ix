/*
  By Andrei Patranoiu
*/

// Dependencies

import React, { Component } from 'react'

// Components

import { Center } from 'components/Flex'
import { Row } from 'components/Flex'


export class Button extends Component {
  constructor () {
    super()
  }

  clicked(){


  }

  render () {

    const buttonStyle = {
          backgroundColor: '#008CBA', /* Green */
          border: 'none',
          color: 'white',
          padding: '15px 32px',
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-block',
          fontSize: '16px'
    

    };

     

    return (
      <div >
        <button type="button" style={buttonStyle} onClick={ () => {this.props.changeState(this.props.say)}}>{this.props.say}</button>
      </div>    
    )
  }
}


export class HandleButton extends Component {
 constructor(props) {
    super(props);
    this.state = {
      showComponent_Main1: true,
      showComponent_Main2: true,
      showComponent_A1: false,
      showComponent_A2: false,
      showComponent_B1: false,
      showComponent_B2: false,
    };
  }


  renderButton(input, condition){
    if(condition == true)
    return <Button say={input} changeState={this.changeState.bind(this)}/>



  }

  changeState(myState){
    //return <Button say='HELLO' renderButton={this.renderButton.bind(this)}/>
    
      alert(myState);

      if(myState == "By Format"){
        this.state.showComponent_Main2 = false;
        this.state.showComponent_A1 = true;
        this.forceUpdate();
      }

      if(myState == "By Platform"){
        this.state.showComponent_Main1 = false;
        this.state.showComponent_B1 = true;
        this.forceUpdate();
      }
      //this.state.showComponent_A1 = true;
      //this.forceUpdate();
        
      
  }


  render () {

    return (
      <div >
        <div>
          <Center>
            <Row>
              <div>
                {this.renderButton("By Format", this.state.showComponent_Main1)}
              </div>
              <div style={{marginLeft: '10px'}}>
                {this.renderButton("By Platform", this.state.showComponent_Main2)}
              </div>
              
            </Row>
          </Center>
          <br/>
          
        </div>

        <Row>
          <Center>
            <div>
              {this.renderButton("Video", this.state.showComponent_A1)}
            </div>
            <div style={{marginLeft: '10px'}}>
              {this.renderButton("Banner", this.state.showComponent_A1)}
            </div>
          </Center>
        </Row>

        <Row>
          <Center>
            <div>
              {this.renderButton("Desktop", this.state.showComponent_B1)}
            </div>
            <div style={{marginLeft: '10px'}}>
              {this.renderButton("Mobile", this.state.showComponent_B1)}
            </div>
            <div style={{marginLeft: '10px'}}>
              {this.renderButton("App", this.state.showComponent_B1)}
            </div>
          </Center>
        </Row>
        
         
      </div>    
    )
  }
}
