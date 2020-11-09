import React, { useEffect } from 'react'
import Header from './Header'
import Messages from './Messages'
import UserInput from './UserInput'
import { Segment } from 'semantic-ui-react'
import { useService } from '@xstate/react'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from '../utils/chatMachineStart'

function ChatWindow({ roomId }) {
    const [mgCurrent, mgSend] = useService(mongooseimSocketService)

    useEffect(() => {
        if (roomId && mgCurrent.matches(SocketMachine.STATES.CONNECTED)) {
            let service = mgCurrent.context.roomMachines.get(roomId)
            !service && mgSend({
                type: SocketMachine.EVENTS.JOIN_ROOM,
                room: roomId,
                needMongooseimRoom: false,
            })
        }
    }, [roomId, mgCurrent, mgSend])

    return (
        <Segment.Group style={{ width: '80%', height: '70%', margin: 'auto' }}>
            <Header roomId={roomId} />
            <Messages roomId={roomId} />
            <UserInput roomId={roomId} />
        </Segment.Group>
    )
}
export default ChatWindow