import React from 'react'
import { exampleUsers, displayTime } from '../utils/utils'
import { Icon, Button, Table } from 'semantic-ui-react'
import { useService } from '@xstate/react'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from './chatMachineStart'

const ADMIN = 'admin@localhost'
const MONGOOSEIM_HOST = 'http://localhost:8088'
const XMPPMUCHost = 'muclight.localhost'

function ChatList() {
    const [mgCurrent] = useService(mongooseimSocketService)

    const handleJoinRoom = async (roomId) => {
        console.log("JOIN ROOM", roomId)
        // let request = {
        //     "sender": ADMIN,
        //     "recipient": `${exampleUsers.bob.username}@localhost`
        // }

        // try {
        //     let resp = await fetch(`${MONGOOSEIM_HOST}/api/muc-lights/${XMPPMUCHost}/${roomId}/participants`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(request),
        //     })
        //     console.log(resp)
        //     return resp
        // } catch (e) {
        //     console.log("join room error", e)
        //     throw Error(e)
        // }
    }

    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='5'>Room Machines</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <RenderRow machines={mgCurrent.context.roomMachines} handleJoinRoom={handleJoinRoom} />
            </Table.Body>
        </Table>
    )
}
export default ChatList

function RenderRow({ machines, handleJoinRoom }) {
    let rows = []
    machines.size > 0 && machines.forEach((value, key) => {
        const username = value.machine.context.username
        const lastReadTime = value.machine.context.lastReadTime
        const unReadMessage = value.machine.context.unReadMessage
        rows.push(
            <Table.Row>
                <Table.Cell collapsing>
                    <Button icon='chat' onClick={() => handleJoinRoom(key)} />
                </Table.Cell>
                <Table.Cell collapsing>
                    {`RoomId: ${key}`}
                </Table.Cell>
                <Table.Cell>
                    {`UserId: ${username}`}
                </Table.Cell>
                <Table.Cell>
                    {`LastReadTime: ${displayTime(lastReadTime)}`}
                </Table.Cell>
                <Table.Cell collapsing textAlign='right'>
                    {`UnReadMessage: ${unReadMessage}`}
                </Table.Cell>
            </Table.Row>
        )
    })

    return rows
}