import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Container,
  CardImage,
  Heading,
  Section,
  Text,
  Block,
  Button,
  Divider,
  Space,
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
  <Space />
  <Flex
    align="center"
    justify="space-around"
  >
    <Box px={3}>
      <IconFile size={70}/>
      <h3>IX API</h3>
      <Text>DataIX uses its own API to crunch in useful data from huge JSON files. We use IX JSON file as an example for extrapolation. Check out our GitHub repo for further details. </Text>
    </Box>
    <Box px={3}>
      <IconGraph size={70}/>
      <h3>Beautiful Display</h3>
      <Text>Using React UI/UX Libraries such as Recharts, Rebass and Reflexbox, data is displayed in a minimalistic and simple manner. Check out our GitHub repo for further details. </Text>
    </Box>
    <Box px={3}>
      <IconGlobe size={70}/>
      <h3>Globalization</h3>
      <Text>DataIX hopes to capture the essence of globalization by comparing data sets between two continents, all platforms, and all formats. We believe this can be more valuable to tech companies who are working to expand overseas.</Text>
    </Box>
  </Flex>
  </Container>
}

export default Blurb;
