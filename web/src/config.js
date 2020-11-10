const SCROLL_TOP_VALUE = 60
const LOADING_MESSAGE_AMOUNT = 4
const MESSAGE_SERVER_HOST = 'http://localhost:30303'
const MONGOOSEIM_ID = 'socket-machine'
const MONGOOSEIM_WS_URL = 'ws://localhost:5280/ws-xmpp'
const MONGOOSEIM_DOMAIN = 'localhost'
const MONGOOSEIM_ROOM_DOMAIN = 'muclight.localhost'
const MONGOOSEIM_PUSH_SERVER_JID = null
const MONGOOSEIM_RESOURCE = null
const MONGOOSEIM_ADMIN = 'admin'


const config = {
    chat: {
        SCROLL_TOP_VALUE: SCROLL_TOP_VALUE,
        LOADING_AMOUNT: LOADING_MESSAGE_AMOUNT
    },
    messageServer: {
        HOST: MESSAGE_SERVER_HOST
    },
    mongooseim: {
        ID: MONGOOSEIM_ID,
        WS_URL: MONGOOSEIM_WS_URL,
        DOMAIN: MONGOOSEIM_DOMAIN,
        ROOM_DOMAIN: MONGOOSEIM_ROOM_DOMAIN,
        PUSH_SERVER_JID: MONGOOSEIM_PUSH_SERVER_JID,
        RESOURCE: MONGOOSEIM_RESOURCE,
        MANAGER: MONGOOSEIM_ADMIN
    }
}

export default config