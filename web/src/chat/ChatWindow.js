import React, { useEffect } from 'react'
import Header from './Header'
import Messages from './Messages'
import UserInput from './UserInput'
import { Segment } from 'semantic-ui-react'
import { useService } from '@xstate/react'
import { SocketMachineMg as SocketMachine, ChatMachineMg as ChatMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from './chatMachineStart'

function ChatWindow({ roomId }) {
    const [mgCurrent, mgSend] = useService(mongooseimSocketService)

    useEffect(() => {
        if (roomId && mgCurrent.matches(SocketMachine.STATES.CONNECTED)) {
            mgSend({
                type: SocketMachine.EVENTS.JOIN_ROOM,
                room: roomId,
                needMongooseimRoom: false,
            })
        }
    }, [roomId])

    return (
        <Segment.Group style={{ width: '80%', height: '70%', margin: 'auto' }}>
            <Header />
            <Messages />
            <UserInput />
        </Segment.Group>
    )
}
export default ChatWindow