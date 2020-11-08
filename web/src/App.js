import React from 'react'
import ChatBox from './chat/ChatBox'
import ChatList from './chat/ChatList'
import './App.css'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBox />
      </header>
      <ChatList />
      <footer>
      </footer>
    </div>
  );
}

export default App;
