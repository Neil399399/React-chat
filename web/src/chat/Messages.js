
import React, { useEffect, useState } from 'react'
import { Message, Segment, Feed } from 'semantic-ui-react'
import { displayTime } from '../utils/utils'
import { useService } from '@xstate/react'
import { SocketMachineMg as SocketMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from '../utils/chatMachineStart'

function Messages({ roomId }) {
    const [mgCurrent] = useService(mongooseimSocketService)
    const [history, setHistory] = useState(null)

    useEffect(() => {
        if (roomId && mgCurrent.matches(SocketMachine.STATES.CONNECTED)) {
            let service = mgCurrent.context.roomMachines.get(roomId)
            service && setHistory(service.state.context.messageStore)
        }
    }, [mgCurrent])

    return (
        <Segment style={{
            height: '60vh',
            overflowY: 'scroll',
            backgroundSize: '100%',
            padding: '20px 0px'
        }}>
            {history && history.map((message) => <RenderMessage key={message.id} message={message} />)}
        </Segment>
    )
}
export default Messages

function RenderMessage({ message }) {

    const displayContent = (content, contentType) => {
        switch (contentType) {
            case 'TEXT':
                return content
            case 'IMG':
                return (
                    <Feed.Extra images >
                        <img src={content} alt="" style={{ width: '100%' }} />
                    </Feed.Extra>
                )
            default:
                return null
        }
    }


    const renderRow = (message) => {
        const { type, contentType, content, timestamp, id } = message
        switch (type) {
            case 'sent':
                return (
                    <Feed.Event style={{ justifyContent: 'flex-end', marginLeft: '30%', marginRight: '1%' }}>
                        <Feed.Content style={{ flex: 'inherit' }}>
                            <Feed.Summary style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Feed.Date>
                                    {displayTime(timestamp)}
                                </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra>
                                <Message>
                                    {displayContent(content, contentType)}
                                </Message>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                )
            case 'received':
                return (
                    <Feed.Event style={{ maxWidth: '70%' }}>
                        <Feed.Label icon="user circle outline" />
                        <Feed.Content style={{ flex: 'inherit' }}>
                            <Feed.Summary>
                                <Feed.User>
                                    {id}
                                </Feed.User>
                                <Feed.Date>
                                    {displayTime(timestamp)}
                                </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra>
                                <Message>
                                    {displayContent(content, contentType)}
                                </Message>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                )
            default:
                break
        }
    }
    return (
        <Feed style={{ display: 'flex' }}>
            {renderRow(message)}
        </Feed>
    )
}
