import React, { Component } from 'react';

import Page from './Page'

import Banner from '../components/Banner'
import Body from '../components/Body'
import GetStarted from '../components/GetStarted'

function Presentation() {
  return (
    <Page>
      <Banner />
      <GetStarted />
    </Page>
  );
}

export default Presentation;
