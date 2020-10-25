import React from 'react'
import './css/Header.css'
import { Segment, Button } from 'semantic-ui-react'


function Header() {
    return (
        <Segment
            textAlign="left"
            color="orange"
            inverted
            size="massive"
        >
            Header
            <Button circular icon="close" inverted style={{ position: 'absolute', left: '97%' }} />
        </Segment>
    )
}
export default Header