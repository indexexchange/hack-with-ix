import React, { Component } from 'react';

import Navbar from './components/Navbar'
import configs from './configs'


class App extends Component {
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

    // App style
    const style = {
      fontFamily,
      fontWeight,
      letterSpacing,
      color,
      backgroundColor
    };

    return (
      <div className="App" style={style}>
        <Navbar />
        <Banner />
      </div>
    );
  }
}

export default App;
