import React from 'react'
import Header from './Header'
import Message from './Message'
import UserInput from './UserInput'
// machine
import { useService } from '@xstate/react'
import { ChatMachine } from '@aetheras/ejchatjs'
// import { ejabberdSocketService } from '../../machine/ejabberdStart'
import './css/ChatWindow.css'
import { Grid, Segment } from 'semantic-ui-react'


function ChatWindow({ chatState, chatStateCallBack, isOwnServices }) {
    return (
        <div style={{ width: '80vw', height: '80vh' }}>
            <Segment.Group>
                <Header />
                <Message />
                <UserInput />
            </Segment.Group>
        </div>
    )
}

export default ChatWindow