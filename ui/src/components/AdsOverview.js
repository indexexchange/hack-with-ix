import React from 'react'
import { Flex, Box } from 'reflexbox'
import _ from 'lodash'
import {
  Stat,
  Section,
} from 'rebass'

import PieChart from './PieChart'

// mock data pulled from API
const DATA = {"message":"OK","data":{"all":[{"spend":583144755.1100008,"views":37622093,"platform":"desktop","format":"video"},{"spend":341570184.59000003,"views":78513137,"platform":"desktop","format":"banner"},{"spend":491349834.10999924,"views":36841598,"platform":"mobile","format":"video"},{"spend":292949026.95000154,"views":89266806,"platform":"mobile","format":"banner"},{"spend":463285784.0700005,"views":21300603,"platform":"app","format":"video"},{"spend":258220594.7399996,"views":49369179,"platform":"app","format":"banner"}],"NA":[{"spend":254846736.41999993,"views":14323052,"platform":"desktop","format":"video"},{"spend":172843896.82000002,"views":34522027,"platform":"desktop","format":"banner"},{"spend":187904214.75999984,"views":11449061,"platform":"mobile","format":"video"},{"spend":137293009.32999986,"views":34381845,"platform":"mobile","format":"banner"},{"spend":167449309.3600001,"views":6350041,"platform":"app","format":"video"},{"spend":103344441.49000001,"views":17232910,"platform":"app","format":"banner"}],"EU":[{"spend":273778198.82999957,"views":17211031,"platform":"desktop","format":"video"},{"spend":132249771.33999997,"views":29402176,"platform":"desktop","format":"banner"},{"spend":226919896.85999978,"views":16296447,"platform":"mobile","format":"video"},{"spend":128366572.8200001,"views":36677837,"platform":"mobile","format":"banner"},{"spend":240716876.69000003,"views":10068840,"platform":"app","format":"video"},{"spend":116678126.38000003,"views":21203713,"platform":"app","format":"banner"}],"AS":[{"spend":54519819.85999997,"views":6088010,"platform":"desktop","format":"video"},{"spend":36476516.429999985,"views":14588934,"platform":"desktop","format":"banner"},{"spend":76525722.49000005,"views":9096090,"platform":"mobile","format":"video"},{"spend":27289444.800000038,"views":18207124,"platform":"mobile","format":"banner"},{"spend":55119598.01999992,"views":4881722,"platform":"app","format":"video"},{"spend":38198026.86999996,"views":10932556,"platform":"app","format":"banner"}]}};

const K = 1000;
const M = 1000000;
const G = 1000000000;

function unitify(x) {
    x = Math.floor(x);
    if(x < K) {
        return {
          value: Math.floor(x),
          unit: "",
        };
    } else if(x < M) {
        return {
          value: Math.floor(x / K),
          unit: "k",
        };
    }
    return {
      value: Math.floor(x / M),
      unit: "M",
    };
}

function AdChart({stats, groupBy, mapBy, label}) {
  // Aggregate data
  const data = _.chain(stats)
  .groupBy('platform')
  .map((value, key) => {
    return {
      name: key,
      value: _.sum(_.map(value, mapBy)),
    }
  })
  .sortBy('name')
  .value();

  return <Flex flexColumn justify="space-between" align="center">
    <p>{label}</p>
    <PieChart data={data} colors={CHART_COLORS} />
  </Flex>
}

const COLORS = {
  app: '#FFBB33',
  desktop: '#00FF88',
  mobile: '#FF0044',
  //other: '#FF8042'
  //app: '#0088FE',
};

const CHART_COLORS = [COLORS.app, COLORS.desktop, COLORS.mobile, COLORS.other];

function ColorBox(props) {
    const {color, width, height, margin} = props;
    return <div style={{
        display: "inline-block",
        backgroundColor: color,
        minHeight:  height,
        minWidth:   width,
        maxHeight:  height,
        maxWidth:   width,
        marginRight:     10,
        border:     "1px solid #111",
        borderRadius: 2,
    }} />
}

function AdChartLegendItem({name, color}) {
  return <Flex justify="space-between">
    <ColorBox color={color} width={40} height={20} />
    <span>{name}</span>
  </Flex>
}

function AdChartLegend(props) {
  return <Flex justify="space-around" align="center" p={2}>
    <AdChartLegendItem name="App" color={COLORS.app} />
    <AdChartLegendItem name="Desktop" color={COLORS.desktop} />
    <AdChartLegendItem name="Mobile" color={COLORS.mobile} />
  </Flex>
}

function PlatformChart(props) {
  return <AdChart groupBy="platform" {...props} />
}

function FormatChart(props) {
  return <AdChart groupBy="format" {...props} />
}

function AdsOverviewCharts({stats}) {
  return <Flex
    justify="space-between"
    wrap
  >
    <PlatformChart stats={stats} mapBy="spend" label="Spend by platform" />
    <PlatformChart stats={stats} mapBy="views" label="Views by platform" />

    <FormatChart stats={stats} mapBy="spend" label="Spend by format" />
    <FormatChart stats={stats} mapBy="views" label="Views by format" />
  </Flex>
}

function AdsOverviewStats({stats}) {
  // Aggregate total
  const total = {
    spend: _.sum(_.map(stats, 'spend')),
    views: _.sum(_.map(stats, 'views')),
  };

  return <Flex
    justify="space-between"
    wrap
    >
    <Stat
      label="Total spend"
      unit={`${unitify(total.spend).unit}\$`}
      value={unitify(total.spend).value}
    />
    <Stat
      label="Total views"
      unit={unitify(total.views).unit}
      value={unitify(total.views).value}
    />
    <Stat
      label="Average spend"
      unit="$ / view"
      value={Math.floor(total.spend/total.views)}
    />
  </Flex>
}

function AdsOverview(props) {
  //const stats = props.stats;
  const stats = DATA.data.all;

  return <Flex flexColumn>
    <Section>
      <AdsOverviewStats stats={stats} />
    </Section>
    <AdsOverviewCharts stats={stats} />
    <AdChartLegend />
  </Flex>
}

export default AdsOverview
