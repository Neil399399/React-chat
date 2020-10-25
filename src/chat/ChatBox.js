import React from 'react'
import ChatWindow from './ChatWindow'
import './css/ChatBox.css'

function ChatBox() {
    return (
        <React.Fragment>
            <div style={{ padding: '30px' }}>
                <ChatWindow />
            </div>
        </React.Fragment>
    )
}
export default ChatBox