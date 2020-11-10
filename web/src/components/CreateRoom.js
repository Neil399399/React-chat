import React from 'react'
import { useService } from '@xstate/react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from 'semantic-ui-react'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from '../utils/chatMachineStart'

function CreateRoom() {
    const [, mgSend] = useService(mongooseimSocketService)

    const handleCreateRoom = () => {
        mgSend({
            type: SocketMachine.EVENTS.JOIN_ROOM,
            room: uuidv4(),
            needMongooseimRoom: true,
            members: []
        })
    }
    return (
        <Button onClick={handleCreateRoom} content="Create New Room" />
    )
}
export default CreateRoom