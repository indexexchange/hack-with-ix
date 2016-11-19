import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Text,
  Block,
  Container,
  Heading,
  Divider,
  Grid,
  Button,
} from 'rebass'

import { Chart } from './Charts'


function Header() {
    return<Box px={5}>
    <Heading level={1}>Stats</Heading>
    <p> Analysis of Statistics </p>
    <Divider />
    </Box>
}

function SummaryInfo() {
  return <Block
    borderLeft
    px={3}
    color='primary'>
    <Heading
      level={2}
      children='Blossom' />
      <br/>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus tristique justo nec semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
    </Text>
  </Block>
}

function Body() {
  return<Container>
  <Header />
  <Flex
  justify="space-around"
>
  <Box p={3}>
    <SummaryInfo />
  <Flex
    justify="space-around">
    <Button />
    <Button />
    <Button />
  </Flex>
  </Box>
  <Box p={3}>
    <Chart />
  </Box>
</Flex>
</Container>
}

export default Body;
