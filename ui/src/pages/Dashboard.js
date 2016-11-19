import React, { Component } from 'react';
import _ from 'lodash'

import { Flex, Box } from 'reflexbox'
import { Container, Heading, Space } from 'rebass'

import Page from './Page'
import DatacenterOverview from '../components/DatacenterOverview'

function getApiData(url) {
  return fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((payload) => payload.data);
}

function getDatacenters() {
  return getApiData('http://localhost:8000/servers')
  .then((servers) => {
    return groupByDatacenter(servers);
  });
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

function Datacenters(props) {
  const dcs = props.datacenters;
  if(!dcs || dcs.length < 1) {
    return <p>Loading ...</p>;
  }

  return <Flex>
    {dcs.map((datacenter) => {
      return <DatacenterOverview dc={datacenter.name} servers={datacenter.servers} />
    })}
  </Flex>
}

function Title(props) {
  return <Flex align="center" justify="space-around">
    <Heading style={{marginBottom: 20, marginTop: 30}} level={1}>{props.children}</Heading>
  </Flex>
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      datacenters: null,
    };
    this.loadDatacenters();
  }

  loadDatacenters() {
    getDatacenters()
    .then((datacenters) => {
      this.setState({
        datacenters: datacenters,
      })
    })
  }

  render() {
    return (
      <Page>
        <Container>
          <Title>Servers</Title>
          <Datacenters datacenters={this.state.datacenters} />
        </Container>
        <Container>
          <Title>Ads</Title>
          {
            // TODO
          }
        </Container>
      </Page>
    );
  }
}

export default App;
