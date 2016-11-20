import React from 'react'
import { Flex, Box } from 'reflexbox'
import _ from 'lodash'
import {
  Stat,
  Section,
} from 'rebass'

import PieChart from './PieChart'

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

function AdChart({stats, groupBy, mapBy, label, colors}) {
  // Aggregate data
  const data = _.chain(stats)
  .groupBy(groupBy)
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
    <PieChart data={data} colors={colors} />
  </Flex>
}

const COLORS = {
  app: '#FFBB33',
  desktop: '#00FF88',
  mobile: '#FF0044',
  //other: '#FF8042'
  //app: '#0088FE',
  video: "#fff",
  banner: "#111",
};

const PLATFORM_COLORS = [COLORS.app, COLORS.desktop, COLORS.mobile, COLORS.other];
//const FORMAT_COLORS =   [COLORS.video, COLORS.banner];
const FORMAT_COLORS = PLATFORM_COLORS;

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
  return <AdChart groupBy="platform" colors={PLATFORM_COLORS} {...props} />
}

function FormatChart(props) {
  return <AdChart groupBy="format" colors={FORMAT_COLORS} {...props} />
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

function unitifyStr(x) {
  const u = unitify(x);
  return `${u.value}${u.unit}`;
}

function AdPlatformSummary({video, banner, platform}) {
  console.log(platform, video, banner);
  return <Box style={{
    borderRadius: 3,
    backgroundColor: COLORS[platform],
    color: "#111",
    padding: 20,
    margin: 10,
    marginTop: 30,
    height: 150,
  }}>
    <Flex flexColumn justify="space-around">
      <Box>{unitifyStr(video.spend)}$ - {unitifyStr(video.views)}</Box>
      <Box>{unitifyStr(banner.spend)}$ - {unitifyStr(banner.views)}</Box>
      <Box>on <b>{platform}</b></Box>
    </Flex>
  </Box>
}

function AdPlatforms({stats}) {
  const platforms = ["app", "desktop", "mobile"];

  return <Flex justify="space-around">
    {platforms.map((platform) => {
      const video = {
        spend: _.chain(stats).filter({platform: platform, format: "video"}).map('spend').sum().value(),
        views: _.chain(stats).filter({platform: platform, format: "video"}).map('views').sum().value(),
      };
      const banner = {
        spend: _.chain(stats).filter({platform: platform, format: "banner"}).map('spend').sum().value(),
        views: _.chain(stats).filter({platform: platform, format: "banner"}).map('views').sum().value(),
      };
      return <Box sm={3}>
        <AdPlatformSummary platform={platform} video={video} banner={banner} />
      </Box>
    })}
  </Flex>
}

function ContinentChoice({label, active}) {
  let style = {
    borderRadius: 100,
    border: "1px solid #fff",
    color: "#eee",
    padding: "10px 20px",
    margin: 10,
  };
  if(active) {
    style = {
      ...style,
      backgroundColor: "#fff",
      color: "#111",
    };
  }

  return <div style={style}>{label}</div>
}

function ContinentChoices() {
  return <Flex>
    <ContinentChoice label="Worldwide" active={true} />
    <ContinentChoice label="Asia" />
    <ContinentChoice label="North America" />
    <ContinentChoice label="Europe" />
  </Flex>
}

function AdsOverview({stats}) {
  return <Flex flexColumn>
    <Flex justify="center">
      <ContinentChoices />
    </Flex>
    <AdsOverviewCharts stats={stats} />
    <AdChartLegend />
  </Flex>
}

export default AdsOverview
