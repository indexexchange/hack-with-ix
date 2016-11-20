import React from 'React'
import { Flex } from 'reflexbox'

import Pill from './Pill'

export default function PillBar(props) {
    const {options, current, onClick} = props;

    return <Flex wrap>
        {options.map((value) =>
            <Pill label={value} active={value === current} onClick={() => onClick(value)} />
        )}
    </Flex>
}
