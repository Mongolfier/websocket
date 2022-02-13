import React, { useRef, useState } from "react";
import axios from "axios";


const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now()
      }
      socket.current.send(JSON.stringify(message));
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [...prev, message])
    }

    socket.current.onclose = () => {
      console.log("Socket закрыт")
    }

    socket.current.onerror = () => {
      console.log("Socket ошибка")
    }
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: message,
    }
    socket.current.send(JSON.stringify(message))
    setValue("")
  }

  if(!connected) {
    return (
      <div>
        <input 
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Ваше имя?"
        />
        <button onClick={connect}>Войти</button>
      </div>
    )
  }

  return (
    <div>
      <input 
        type="text" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={sendMessage}
      >
        Отправить
      </button>

      <div>
        <ul>
          {messages.map( (message) => {
            return (
              <li style={{border: "1px solid black;"}} key={message.id}>{message.message}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default WebSock;