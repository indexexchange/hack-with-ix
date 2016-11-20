import React from 'react'
import { Box } from 'reflexbox'
import {
  Fixed,
  NavItem,
  Space,
  Toolbar
} from 'rebass'

import IconOctocat from 'react-icons/lib/fa/github'
import IconEmail from 'react-icons/lib/fa/envelope-o'


function Navbar() {
  return <Toolbar>
    <NavItem href='/' children='Team 01' />
    <Space auto />
    <NavItem href='./' color="#686B7B">
    <Box px={1}><p>Home</p></Box>
    </NavItem>
    <NavItem href='./compare' color="#686B7B">
    <Box px={1}>Compare</Box>
    </NavItem>
    <NavItem href='https://github.com/Kent-Chow/hack-with-ix'>
      <IconOctocat size={20} />
      <Box px={1}>GitHub</Box>
    </NavItem>
  </Toolbar>
}

export default Navbar
