import React, { Component } from 'react';

import { Flex, Box } from 'reflexbox'
import { Container, Heading } from 'rebass'

import Navbar from '../components/Navbar'
import configs from '../components/configs'
import DatacenterOverview from '../components/DatacenterOverview'


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
        <Container>
          <Flex align="center" justify="space-around">
            <Heading level={1}>Servers</Heading>
          </Flex>
          <Flex>
            <DatacenterOverview dc="EU" />
            <DatacenterOverview dc="NA" />
            <DatacenterOverview dc="AS" />
          </Flex>
        </Container>

      </div>
    );
  }
}

export default App;
