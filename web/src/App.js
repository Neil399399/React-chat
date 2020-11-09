import React, { useState } from 'react'
import ChatBox from './chat/ChatBox'
import ChatList from './ChatList'
import CreateNewRoom from './CreateChatRoom'
import './App.css'
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [roomId, setRoomId] = useState(null)
  console.log(roomId)
  return (
    <div className="App">
      <header className="App-header">
        <CreateNewRoom />
      </header>
      <main className="App-main">
        <ChatBox roomId={roomId} />
      </main>
      <ChatList handleSetRoom={setRoomId} />
      <footer>
      </footer>
    </div>
  );
}

export default App;
