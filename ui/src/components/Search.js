import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Form from 'lib/react/form';
import Input from 'lib/react/input';
import Textarea from 'lib/react/textarea';
import { Button } from 'react-materialize';

import Dropb, {DDFormat, DDLocation, DDPlatform} from 'components/Dropb'

export default class Search extends Component {
  constructor () {
    super()
  }

  render() {
    return (
      <Form>
        <legend> Enter the values, b </legend>
        <DDFormat />
        <DDPlatform />
		<DDLocation />

        <Button waves='light'>Submit</Button>
      </Form>
    );
  }
}