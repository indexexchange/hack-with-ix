import React, { Component } from 'react';
import _ from 'lodash'

import { Flex, Box } from 'reflexbox'
import { Container, Heading, Section } from 'rebass'

import Page from './Page'
import AdsOverview from '../components/AdsOverview'
import KeyMetrics from '../components/KeyMetrics'
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

// mock data pulled from API
const DATA = {"message":"OK","data":{"all":[{"spend":583144755.1100008,"views":37622093,"platform":"desktop","format":"video"},{"spend":341570184.59000003,"views":78513137,"platform":"desktop","format":"banner"},{"spend":491349834.10999924,"views":36841598,"platform":"mobile","format":"video"},{"spend":292949026.95000154,"views":89266806,"platform":"mobile","format":"banner"},{"spend":463285784.0700005,"views":21300603,"platform":"app","format":"video"},{"spend":258220594.7399996,"views":49369179,"platform":"app","format":"banner"}],"NA":[{"spend":254846736.41999993,"views":14323052,"platform":"desktop","format":"video"},{"spend":172843896.82000002,"views":34522027,"platform":"desktop","format":"banner"},{"spend":187904214.75999984,"views":11449061,"platform":"mobile","format":"video"},{"spend":137293009.32999986,"views":34381845,"platform":"mobile","format":"banner"},{"spend":167449309.3600001,"views":6350041,"platform":"app","format":"video"},{"spend":103344441.49000001,"views":17232910,"platform":"app","format":"banner"}],"EU":[{"spend":273778198.82999957,"views":17211031,"platform":"desktop","format":"video"},{"spend":132249771.33999997,"views":29402176,"platform":"desktop","format":"banner"},{"spend":226919896.85999978,"views":16296447,"platform":"mobile","format":"video"},{"spend":128366572.8200001,"views":36677837,"platform":"mobile","format":"banner"},{"spend":240716876.69000003,"views":10068840,"platform":"app","format":"video"},{"spend":116678126.38000003,"views":21203713,"platform":"app","format":"banner"}],"AS":[{"spend":54519819.85999997,"views":6088010,"platform":"desktop","format":"video"},{"spend":36476516.429999985,"views":14588934,"platform":"desktop","format":"banner"},{"spend":76525722.49000005,"views":9096090,"platform":"mobile","format":"video"},{"spend":27289444.800000038,"views":18207124,"platform":"mobile","format":"banner"},{"spend":55119598.01999992,"views":4881722,"platform":"app","format":"video"},{"spend":38198026.86999996,"views":10932556,"platform":"app","format":"banner"}]}};

function Datacenters(props) {
  const dcs = props.datacenters;
  if(!dcs || dcs.length < 1) {
    return <p>Loading ...</p>;
  }

  return <Flex flexAuto justify="space-around">
    {dcs.map((datacenter) => {
      return <Box sm={4}>
        <DatacenterOverview dc={datacenter.name} servers={datacenter.servers} />
      </Box>
    })}
  </Flex>
}

function Title(props) {
  return <Flex align="center" justify="space-around">
    <Heading style={{marginBottom: 20, marginTop: 30, textAlign: "center"}} level={1}>
      {props.text}
      <br/>
      <small style={{fontWeight: "normal", fontSize: 14, textTransform: "none"}}>{props.subtext}</small>
    </Heading>
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
    const stats = DATA.data.all;

    return (
      <Page>

        <Container>
          <Title text="Servers" />
          <Datacenters datacenters={this.state.datacenters} />
        </Container>

        <Section><Container>
          <Title text="Key Metrics" />
          <KeyMetrics stats={stats} />
        </Container></Section>

        <Container>
          <Title text="Ads" subtext="Overview of past 14 days" />
          <AdsOverview stats={stats} />
        </Container>

      </Page>
    );
  }
}

export default App;
