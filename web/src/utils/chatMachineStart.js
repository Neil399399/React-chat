import { interpret } from 'xstate'
import { SocketMachineMg } from '@aetheras/ejchatjs'
import config from '../config'

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
    config.mongooseim.ID,
    config.mongooseim.WS_URL,
    config.mongooseim.DOMAIN,
    config.mongooseim.ROOM_DOMAIN,
    config.mongooseim.PUSH_SERVER_JID,
    chatStorage,
    config.mongooseim.RESOURCE,
    config.mongooseim.MANAGER,
    true
)).onTransition((state) => {
    if (state.changed) {
        console.log('* current state:', state.value);
    }
}).start()