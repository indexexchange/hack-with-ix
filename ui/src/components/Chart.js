import React, { Component } from 'react'
import NVD3Chart from "react-nvd3";
import d3 from "d3";

import { Row } from 'components/Flex'

var TestBarData = [{
  key: "Cumulative Return",
  values: [
    {
      "label" : "A" ,
      "value" : -29.765957771107
    } ,
    {
      "label" : "B" ,
      "value" : 0
    } ,
    {
      "label" : "C" ,
      "value" : 32.807804682612
    } ,
    {
      "label" : "D" ,
      "value" : 196.45946739256
    } ,
    {
      "label" : "E" ,
      "value" : 0.19434030906893
    } ,
    {
      "label" : "F" ,
      "value" : -98.079782601442
    } ,
    {
      "label" : "G" ,
      "value" : -13.925743130903
    } ,
    {
      "label" : "H" ,
      "value" : -5.1387322875705
    }
  ]
}];

var TestLineData = [{
  key: "Spend",
  values: [
    {
      "hour" : 0,
      "value" : 12
    },
    {
      "hour" : 1,
      "value" : 13
    },
    {
      "hour" : 2,
      "value" : 16
    },
    {
      "hour" : 3,
      "value" : 20
    },
  ]
}];

export default class Chart extends Component {
  render () {
    return (
      <div style={{width: "55%"}}>
        <BarChart data={this.props.platformVsCost} x="label" y="value"></BarChart>

        <LineChart data={this.props.timeToCost} x="hour" y="value"></LineChart>
      </div>

    )
  }
}

export class LineChart extends Component {
  render() {
    return (
      <NVD3Chart type="lineChart" datum={this.props.data} x={this.props.x} y={this.props.y} useInteractiveGuideline={true} />
    );
  }
}

export class BarChart extends Component {
  render() {
    return (
      <NVD3Chart type="discreteBarChart" datum={this.props.data} x={this.props.x} y={this.props.y}/>
    );
  }
}
