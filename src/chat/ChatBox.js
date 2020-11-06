import React, { useEffect, useState } from 'react'
import { useService } from '@xstate/react'
import { exampleUsers } from '../utils/utils'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from './chatMachineStart'
import ChatWindow from './ChatWindow'
import LoadingProgress from './LoadingProgress'

function ChatBox() {
    const [mgCurrent, mgSend] = useService(mongooseimSocketService)
    const [open, setOpen] = useState(true)

    useEffect(() => {
        // build the client and connect
        if (mgCurrent.matches(SocketMachine.STATES.NO_CLIENT)) {
            console.log("<==BUILD CLIENT AND CONNECT REQUEST==>")
            mgSend({ type: SocketMachine.EVENTS.CONNECT_SOCKET, username: exampleUsers.bob.username, userToken: exampleUsers.bob.password })
        }
        if (mgCurrent.matches(SocketMachine.STATES.CONNECTED)) {
            setOpen(false)
        }
    }, [mgCurrent, mgSend])

    return (
        <React.Fragment>
            <div style={{ padding: '30px' }}>
                <LoadingProgress state={open} handleClose={() => setOpen(false)} />
                <ChatWindow />
            </div>
        </React.Fragment>
    )
}
export default ChatBox