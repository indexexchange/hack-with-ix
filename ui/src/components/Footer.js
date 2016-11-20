import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Container,
  Section,
} from 'rebass'

import IconHeart from 'react-icons/lib/fa/heart'

function Footer() {
  return <Container>
    <Section>
        <center>Built with <IconHeart color="#f44" /> by Inseo, Kent, Keerush for Hackathon IX</center>
    </Section>
  </Container>
}

export default Footer;