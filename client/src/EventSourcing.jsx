import React, { useEffect, useState } from "react";
import axios from "axios";

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource("http://localhost:5000/connect")
        eventSource.onmessage = function(event) {
            const message = JSON.parse(event.data)
            setMessages(prev => [...prev, message])
        }
    }

    const sendMessage = async () => {
        await axios.post("http://localhost:5000/new-messages", {
            message: value,
            id: Date.now(),
        })
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
                            <li key={message.id}>{message.message}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default EventSourcing;