
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Message, Segment, Feed } from 'semantic-ui-react'
import { displayTime } from '../utils/utils'
import { useService } from '@xstate/react'
import LoadingProgress from '../components/LoadingProgress'
import { ChatMachineMg as ChatMachine } from '@aetheras/ejchatjs'
import { mongooseimSocketService } from '../utils/chatMachineStart'
import config from '../config'
import './css/Chat.css'

function Messages({ roomId, messages }) {
    const [, mgSend] = useService(mongooseimSocketService)
    const [loading, setLoad] = useState(false)
    const [, setTempMsgStore] = useState(null)
    const scrollRef = useRef(null)

    const checkToScrollUp = useCallback(() => {
        setLoad((prev) => {
            if (prev) {
                scrollRef.current.scrollTop = config.chat.SCROLL_TOP_VALUE
                return false
            }
            return prev
        })
    }, [])

    const checkToScrollDown = useCallback(() => {
        setTempMsgStore((prev) => {
            if (!prev || (prev.length !== messages.length)) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                return messages
            }
            return prev
        })
    }, [messages])


    useEffect(() => {
        if (roomId && messages) {
            // if have new message, scroll will automatically to bottom.
            checkToScrollDown()
            // if loading the history, scroll shouldn't focus on lastest message.
            checkToScrollUp()
        }
    }, [checkToScrollUp, checkToScrollDown, messages, roomId])

    const handleLoadHistory = () => {
        if (scrollRef.current.scrollTop === 0) {
            mgSend({ type: ChatMachine.EVENTS.LOAD_MSG, room: roomId, amount: config.chat.LOADING_AMOUNT })
            setLoad(true)
        }
    }

    return (
        <Segment className="chatMessages">
            <div className="scroll" ref={scrollRef} onScroll={handleLoadHistory}>
                <LoadingProgress state={loading} handleClose={() => setLoad(false)} />
                {messages && messages.map((message) => <RenderMessage key={message.id} message={message} />)}
            </div>
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
                        <img className="image" src={content} alt="" />
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
