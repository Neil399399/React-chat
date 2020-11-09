import React from 'react'
import { Segment, Button, Header as HeaderUI, Icon } from 'semantic-ui-react'

function Header({ roomId }) {
    return (
        <Segment
            clearing
            color="orange"
            inverted
            style={{ display: 'flex' }}
        >
            <HeaderUI as='h1' content={roomId} />
        </Segment>
    )
}
export default Header