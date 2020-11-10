import React, { useEffect, useState } from 'react'
import Header from './Header'
import Messages from './Messages'
import UserInput from './UserInput'
import { Segment } from 'semantic-ui-react'
import { useService } from '@xstate/react'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from '../utils/chatMachineStart'
import './css/Chat.css'

function ChatWindow({ roomId }) {
    const [mgCurrent, mgSend] = useService(mongooseimSocketService)
    const [messages, setMessages] = useState(null)

    useEffect(() => {
        if (roomId && mgCurrent.matches(SocketMachine.STATES.CONNECTED)) {
            const service = mgCurrent.context.roomMachines.get(roomId)
            if (service) {
                setMessages(service.state.context.messageStore)
            } else {
                mgSend({
                    type: SocketMachine.EVENTS.JOIN_ROOM,
                    room: roomId,
                    needMongooseimRoom: false,
                })
            }
        }
    }, [roomId, mgCurrent, mgSend])

    return (
        <Segment.Group className="chatWindow" style={{ margin: 'auto' }}>
            <Header roomId={roomId} />
            <Messages roomId={roomId} messages={messages} />
            <UserInput roomId={roomId} />
        </Segment.Group>
    )
}
export default ChatWindow