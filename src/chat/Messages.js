
import React from 'react'
import { Message, Segment, Icon, Feed } from 'semantic-ui-react'

import './css/Message.css'

function Messages({ messages }) {
    return (
        <Segment style={{
            height: '60vh',
            overflowY: 'scroll',
            backgroundSize: '100%',
            padding: '20px 0px'
        }}>
            {messages.map((message) => <RenderMessage message={message} />)}
        </Segment>
    )
}
export default Messages

function RenderMessage({ message }) {
    const renderRow = (message) => {
        const { type, contentType, content, timestamp, user } = message
        switch (type) {
            case 'send':
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
                                    <RenderContent content={content} contentType={contentType} />
                                </Message>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                )
            case 'receive':
                return (
                    <React.Fragment>
                        <Feed.Event style={{ maxWidth: '70%' }}>
                            <Feed.Label icon="user circle outline" />
                            <Feed.Content style={{ flex: 'inherit' }}>
                                <Feed.Summary>
                                    <Feed.User>
                                        {user}
                                    </Feed.User>
                                    <Feed.Date>
                                        {displayTime(timestamp)}
                                    </Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra>
                                    <Message>
                                        <RenderContent content={content} contentType={contentType} />
                                    </Message>
                                </Feed.Extra>
                            </Feed.Content>
                        </Feed.Event>
                    </React.Fragment>
                )
            default:
                break
        }
    }

    return (
        <React.Fragment>
            <Feed style={{ display: 'flex' }}>
                {renderRow(message)}
            </Feed>
        </React.Fragment>
    )
}

function RenderContent({ content, contentType }) {
    switch (contentType) {
        case 'text':
            return content
        case 'image':
            return (
                <Feed.Extra images >
                    <img src={content} style={{ width: '100%' }} />
                </Feed.Extra>
            )
        default:
            return null
    }

}

function displayTime(timestamp) {
    const date = new Date(timestamp / 1000)
    const hours = date.getHours()
    const minutes = (`0${date.getMinutes()}`).slice(-2)
    return `${hours}:${minutes}`
}