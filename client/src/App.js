import React, { useState, useRef } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import './App.css';

const socket = io.connect("http://localhost:8000")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false);
  const usernameInput = useRef()
  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room)
      setShowChat(true);
    } else {
      usernameInput.current.focus();
    }
  }

  return (
    <div className="App">
      {!showChat ?
        (<div className="joinChatContainer">
          <h3>Chat App </h3>
          <input type="text" ref={usernameInput} value={username} placeholder="username" onChange={e => setUsername(e.target.value)} />
          <input type="text" value={room} placeholder="room id" onChange={e => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join Room</button>
        </div>) :
        (<Chat socket={socket} author={username} room={room} />)
      }
    </div>
  );
}

export default App;
