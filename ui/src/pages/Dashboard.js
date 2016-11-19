import React, { Component } from 'react';
import _ from 'lodash'

import { Flex, Box } from 'reflexbox'
import { Container, Heading } from 'rebass'

import Page from './Page'
import DatacenterOverview from '../components/DatacenterOverview'

function getApiData(url) {
  return fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((payload) => payload.data);
}

function getServers() {
  return getApiData('http://localhost:8000/servers');
}

function groupByDatacenter(servers) {
  return _.chain(servers)
  .groupBy('dc')
  .map((value, key) => {
    return {
      name: key,
      servers: value,
    }
  })
  .sortBy('name')
  .value();
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
        servers: groupByDatacenter(servers),
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
            { !this.state.servers ?
              <p>Loading ...</p> :
              <Flex>
                {this.state.servers.map((datacenter) => {
                  return <DatacenterOverview dc={datacenter.name} servers={datacenter.servers} />
                })}
              </Flex>
            }
        </Container>
      </Page>
    );
  }
}

export default App;
