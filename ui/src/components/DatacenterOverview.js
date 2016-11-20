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

    return <Box style={{
        display: "inline-block",
        backgroundColor: color,
        minHeight: 15,
        minWidth: 30,
        maxHeight: 15,
        maxWidth: 30,
        margin: 10,
        borderRadius: 3,
    }} />
}

function DatacenterOverview(props) {
    return <Panel style={{
        height: 100,
        margin: 5,
    }}>
    <Flex align="center">
        <Box sm={3}>
            <span style={{
                fontSize: 40,
                fontWeight: "bold",
            }}>{props.dc}</span>
        </Box>
        <Box sm={9}>
        <Flex align="stretch" align="center" wrap>
            {props.servers.map((server) => <ServerStatus server={server} />)}
        </Flex>
        </Box>
    </Flex>
  </Panel>
}

export default DatacenterOverview
