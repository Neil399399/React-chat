import React, { useState } from 'react'
import ChatBox from './chat/ChatBox'
import ChatList from './components/ChatList'
import CreateNewRoom from './components/CreateRoom'
import './App.css'
import 'semantic-ui-css/semantic.min.css'

function App() {
  const [roomId, setRoomId] = useState(null)

  return (
    <div className="App">
      <header className="App-header">
        <CreateNewRoom />
      </header>
      <main className="App-main">
        <ChatBox roomId={roomId} />
      </main>
      <footer>
        <ChatList handleSetRoom={setRoomId} />
      </footer>
    </div>
  );
}

export default App;
