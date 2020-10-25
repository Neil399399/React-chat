
import React from 'react'
import { Message, Segment, Icon, Feed } from 'semantic-ui-react'

import './css/Message.css'

function Messages({ messages }) {
    return (
        <Segment className='message_list'>
            {messages.map((message) => <RenderMessage message={message} />)}
        </Segment>
    )
}
export default Messages

function RenderMessage({ message }) {

    const renderRow = (message) => {
        const { type, messageType, content, timestamp } = message
        switch (type) {
            case 'send':
                return (
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Summary>
                                <Feed.Date>
                                    {timestamp}
                                </Feed.Date>
                            </Feed.Summary>
                            <Feed.Extra>
                                <Message >
                                    {content}
                                </Message>
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                )
            case 'receive':
                return (
                    <React.Fragment>
                        <Feed.Event>
                            <Feed.Label icon="user circle outline" />
                            <Feed.Content>
                                <Feed.Summary>
                                    <Feed.Date>
                                        {timestamp}
                                    </Feed.Date>
                                </Feed.Summary>
                                <Feed.Extra>
                                    <Message>
                                        {content}
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
            <Feed style={{ height: '80px', width: 'auto', maxWidth: '50%' }}>
                {renderRow(message)}
            </Feed>
        </React.Fragment>
    )
}