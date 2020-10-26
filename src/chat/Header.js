import React from 'react'
import './css/Header.css'
import { Segment, Button, Header as HeaderUI, Icon } from 'semantic-ui-react'


function Header() {
    return (
        <Segment
            clearing
            color="orange"
            inverted
            style={{ display: 'flex' }}
        >
            <HeaderUI as='h1' content="header" style={{ display: 'flex', margin: 0 }} />
            <HeaderUI as='h2' floated='right' style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button icon inverted >
                    <Icon name="close" />
                </Button>
            </HeaderUI>
        </Segment>
    )
}
export default Header