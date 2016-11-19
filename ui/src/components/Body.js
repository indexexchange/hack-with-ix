import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Text,
  Block,
  Container,
} from 'rebass'

import { Chart } from './Charts'

function BodyChart() {
  return <Flex>
    <Box py={4} px={4}>
      <Chart />
    </Box>
  </Flex>
}


export default BodyChart;
