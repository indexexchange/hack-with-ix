import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Text,
  Block,
  Container,
} from 'rebass'

import { Chart } from './Charts'

function BodyChart() {
  return <Container>
    <Box py={4} px={4}>
      <Chart />
    </Box>
  </Container>
}


export default BodyChart;
