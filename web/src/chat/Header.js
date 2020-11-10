import React from 'react'
import { Segment, Header as HeaderUI } from 'semantic-ui-react'
import './css/Chat.css'

function Header({ roomId }) {
    return (
        <Segment
            className="chatHeader"
            clearing
            color="orange"
            inverted
        >
            <HeaderUI as='h1' content={roomId} />
        </Segment>
    )
}
export default Header