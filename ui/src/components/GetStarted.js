import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Container,
  CardImage,
  Heading,
  Section,
  Text,
  Block,
  Panel,
  PanelHeader,
  Button,
  Divider,
} from 'rebass'

import IconGraph from 'react-icons/lib/fa/bar-chart'
import IconFile from 'react-icons/lib/fa/file-o'
import IconGlobe from 'react-icons/lib/fa/globe'

function Blurb() {
  return <Container>
    <Box px={5}>
    <Heading level={1}>DataIX</Heading>
    <p> "DataIX is the next generation's answer to analyzing massive data" </p>
    </Box>
  <Divider />
  <Flex
    align="center"
    justify="space-around"
  >
    <Box p={3}>
      <IconFile size={70}/>
      <h3>IX API</h3>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus tristique justo nec semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</Text>
    </Box>
    <Box px={3}>
      <IconGraph size={70}/>
      <h3>Beautiful Display</h3>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus tristique justo nec semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.</Text>
    </Box>
    <Box p={3}>
      <IconGlobe size={70}/>
      <h3>Globalization</h3>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus tristique justo nec semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae. </Text>
    </Box>
  </Flex>
  </Container>
}

export default Blurb;
