import React, { useState, useEffect } from 'react'
import './css/Header.css'
import { Container, Segment, Header as HeaderUI } from 'semantic-ui-react'


function Header() {
    return (
        <Segment
            textAlign="left"
            color="orange"
            inverted
            size="massive"
        >
            Header
        </Segment>
    )
}
export default Header