import React from 'react'
import { Flex, Box } from 'reflexbox'
import _ from 'lodash'
import {
  Stat,
  Section,
} from 'rebass'

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


function KeyStat(props) {
  return <Box style={{
    backgroundColor: "#ddd",
    color: "#111",
    padding: 20,
    margin: 10,
    borderRadius: 3,
  }} >
    <Stat {...props} />
  </Box>
}

function KeyMetrics({stats}) {
  // Aggregate total
  const total = {
    spend: _.sum(_.map(stats, 'spend')),
    views: _.sum(_.map(stats, 'views')),
  };

  return <Flex
    justify="space-between"
    wrap
    >
    <KeyStat
      label="Total spend"
      unit={`${unitify(total.spend).unit}\$`}
      value={unitify(total.spend).value}
    />
    <KeyStat
      label="Total views"
      unit={unitify(total.views).unit}
      value={unitify(total.views).value}
    />
    <KeyStat
      label="Average spend"
      unit="$ / view"
      value={Math.floor(total.spend/total.views)}
    />
  </Flex>
}

export default KeyMetrics;