import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  Panel
} from 'rebass'

const STATUS_COLORS = {
    "GREEN":    "#00FF88",
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
        minHeight: 15,
        minWidth: 40,
        maxHeight: 15,
        maxWidth: 40,
        margin: 10,
        borderRadius: 3,
    }} />
}

function DatacenterOverview(props) {
    return <Panel style={{
        margin: 10,
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
        <Flex wrap>
            {props.servers.map((server) => <ServerStatus server={server} />)}
        </Flex>
        </Box>
    </Flex>
  </Panel>
}

export default DatacenterOverview
