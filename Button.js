/*
  By Andrei Patranoiu
*/

// Dependencies

import React, { Component } from 'react'



// Components

import { Center } from 'components/Flex'
import { Row } from 'components/Flex'
import { Button } from 'react-bootstrap';



export class ButtonMain extends Component {
  constructor () {
    super()
  }

  clicked(){
    alert("HARRO DURR")

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
        <button type="button" className="btn btn-primary" dataDismiss={this.props.data} onClick={ () => {this.props.changeState(this.props.say)}}>{this.props.say}</button>
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


  renderButton(input, condition, input2){
    if(condition == true)
    return <ButtonMain say={input} changeState={this.changeState.bind(this)} data={input2}/>



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
                {this.renderButton("By Format", this.state.showComponent_Main1, "null")}
              </div>
              <div style={{marginLeft: '10px'}}>
                {this.renderButton("By Platform", this.state.showComponent_Main2, "null")}
              </div>
              
            </Row>
          </Center>
          <br/>
          
        </div>

        <Row>
          <Center>
            <div>
              {this.renderButton("Video", this.state.showComponent_A1, "Modal")}
            </div>
            <div style={{marginLeft: '10px'}}>
              {this.renderButton("Banner", this.state.showComponent_A1, "Modal")}
            </div>
          </Center>
        </Row>

        <Row>
          <Center>
            <div>
              {this.renderButton("Desktop", this.state.showComponent_B1, "Modal")}
            </div>
            <div style={{marginLeft: '10px'}}>
              {this.renderButton("Mobile", this.state.showComponent_B1, "Modal")}
            </div>
            <div style={{marginLeft: '10px'}}>
              {this.renderButton("App", this.state.showComponent_B1, "Modal")}
            </div>
          </Center>
        </Row>
        
         
      </div>    
    )
  }
}
