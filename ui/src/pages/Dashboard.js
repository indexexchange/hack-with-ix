import React, { Component } from 'react';

import { Flex, Box } from 'reflexbox'
import { Container, Heading } from 'rebass'

import Page from './Page'
import DatacenterOverview from '../components/DatacenterOverview'

function getApiData(url) {
  return fetch(url)
  .then((response) => {
    return response.json().data;
  });
}

function getServers() {
  return getApiData('http://localhost:8000/servers');
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      servers: null,
    };
    this.loadServers();
  }

  loadServers() {
    getServers()
    .then((servers) => {
      this.setState({
        servers: servers,
      })
    })
  }

  render() {
    return (
      <Page>
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
      </Page>
    );
  }
}

export default App;
