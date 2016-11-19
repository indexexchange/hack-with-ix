import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Panel
} from 'rebass'

const STATUS_COLORS = {
    "GREEN":    "green",
    "YELLOW":   "yellow",
    "ORANGE":   "orange",
    "RED":      "red",
    "GREY":     "grey",
};



function ServerStatus(props) {
    const color = STATUS_COLORS[props.server.status] || "grey";

    return <div style={{
        display: "inline-block",
        backgroundColor: color,
        height: 30,
        width: 100,
        margin: 10,
    }} />
}

function DatacenterOverview(props) {
    return <Panel style={{
        margin: 30,
    }}>
    <Flex>
        <Box sm={3}>
        <Flex auto flexColumn={true} justify="space-around" align="center">
            <span style={{
                fontSize: 40,
                fontWeight: "bold",
            }}>{props.dc}</span>
        </Flex>
        </Box>
        <Box sm={3}>
        <Flex direction="row" wrap>
            {props.servers.map((server) => <ServerStatus server={server} />)}
        </Flex>
        </Box>
    </Flex>
  </Panel>
}

export default DatacenterOverview
