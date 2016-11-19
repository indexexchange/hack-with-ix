import React from 'react'
import { Box } from 'reflexbox'
import {
  Banner,
  Heading,
  Text,
  Button,
  CardImage,
} from 'rebass'


function Header() {
  return <Banner
    style={{
      minHeight: '75vh',
      paddingTop: 48,
      backgroundAttachment: 'fixed'
    }}
    align="center"
    backgroundImage="http://www.idatha.com/sitio/img/hero25.jpg">
    <Heading size={1} big children='DataIX' />
    <Text children='Simple tool for crunching massive data' />
    <Box py={2}>
      <Button
        children='Get Started' />
    </Box>
  </Banner>
}

export default Header
