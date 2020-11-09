import { interpret } from 'xstate'
import { SocketMachineMg } from '@aetheras/ejchatjs'

const chatStorage = {
    get: function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key)
        })
    },

    set: function (key, timestamp) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, timestamp)
        })
    }
}

export const mongooseimSocketService = interpret(SocketMachineMg.NewMongooseimSocketMachine(
    'socket-machine',
    'ws://localhost:5280/ws-xmpp',
    'localhost',
    'muclight.localhost',
    null,
    chatStorage,
    null,
    'admin',
    true
)).onTransition((state) => {
    if (state.changed) {
        console.log('* current state:', state.value);
    }
}).start()