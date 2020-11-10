import React from 'react'
import { exampleUsers, displayTime } from '../utils/utils'
import { Button, Table } from 'semantic-ui-react'
import { useService } from '@xstate/react'
import { mongooseimSocketService } from '../utils/chatMachineStart'
import config from '../config'

function ChatList({ handleSetRoom }) {
    const [mgCurrent] = useService(mongooseimSocketService)

    const handleJoinRoom = async (roomId) => {
        let request = {
            "room": roomId,
            "recipient": `${exampleUsers.eve.username}@localhost`
        }
        let resp = await joinRoomAPI(request)
        if (resp.status === 200) {
            handleSetRoom(roomId)
        }
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

async function joinRoomAPI(request) {
    try {
        let resp = await fetch(`${config.messageServer.HOST}/mongooseim/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request),
        })
        return resp
    } catch (e) {
        console.log("join room error", e)
        throw Error(e)
    }
}