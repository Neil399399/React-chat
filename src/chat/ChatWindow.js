import React from 'react'
import Header from './Header'
import Messages from './Messages'
import UserInput from './UserInput'
import './css/ChatWindow.css'
import { Segment } from 'semantic-ui-react'


function ChatWindow() {
    return (
        <div style={{ width: '80vw', height: '80vh' }}>
            <Segment.Group>
                <Header />
                <Messages messages={MockMessages} />
                <UserInput />
            </Segment.Group>
        </div>
    )
}

export default ChatWindow

const MockMessages = [
    {
        messageType: 'text',
        content: "helloA",
        type: "send",
        timestamp: 1603595223
    },
    {
        messageType: 'text',
        content: "helloB",
        type: "receive",
        timestamp: 1603595223
    },
    {
        messageType: 'text',
        content: "helloC",
        type: "send",
        timestamp: 1603595223
    },
    {
        messageType: 'text',
        content: `Here you can find activities to practise your reading skills. Reading will help you to improve your understanding of the language and build your vocabulary.
The self-study lessons in this section are written and organised according to the levels of the Common European Framework of Reference for languages (CEFR). 
There are different types of texts and interactive exercises that practise the reading skills you need to do well in your studies, to get ahead at work and to communicate in English in your free time.
Take our free online English test to find out which level to choose. Select your level, from beginner (CEFR level A1) to advanced (CEFR level C1), and improve your reading skills at your own speed, whenever it's convenient for you.`,
        type: "receive",
        timestamp: 1603595223
    }
]