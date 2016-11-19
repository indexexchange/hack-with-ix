import React, { Component } from 'react';

import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import configs from '../components/configs'
import Body from '../components/Body'
import GetStarted from '../components/GetStarted'


class Presentation extends Component {
  static childContextTypes = {
    rebass: React.PropTypes.object
  }

  getChildContext () {
    return {
      rebass: configs.rebass,
    }
  }

  render() {

    // Design config values
    const {
      fontFamily,
      fontWeight,
      letterSpacing,
      color,
      backgroundColor
    } = configs.rebass;

    // Presentation style
    const style = {
      fontFamily,
      fontWeight,
      letterSpacing,
      color,
      backgroundColor
    };

    return (
      <div className="Presentation" style={style}>
        <Navbar />
        <Banner />
        <GetStarted />
      </div>
    );
  }
}

export default Presentation;
