import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Heading,
} from 'rebass'

export default function Title(props) {
  return <Flex align="center" justify="space-around">
    <Heading style={{marginBottom: 20, marginTop: 30, textAlign: "center"}} level={1}>
      {props.text}
      <br/>
      <small style={{fontWeight: "normal", fontSize: 14, textTransform: "none"}}>{props.subtext}</small>
    </Heading>
  </Flex>
}
