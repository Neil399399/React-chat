import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ChatWindow from './ChatWindow'
// import { getJWTToken } from '../../utils/utils'
import { useService } from '@xstate/react'
import { SocketMachine, ChatMachine } from '@aetheras/ejchatjs'
// import { ejabberdSocketService } from '../../machine/ejabberdStart'
import './css/ChatBox.css'

function ChatBox() {
    return (
        <React.Fragment>
            <ChatWindow />
        </React.Fragment>
    )
}
export default ChatBox