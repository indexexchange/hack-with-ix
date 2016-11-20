import React, { Component } from 'react';

import { Flex, Box } from 'reflexbox'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import configs from '../components/configs'

class Page extends Component {
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

    // Page style
    const style = {
      fontFamily,
      fontWeight,
      letterSpacing,
      color,
      backgroundColor
    };

    return (
      <div className="Page" style={style}>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Page;
