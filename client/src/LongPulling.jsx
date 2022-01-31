import React, { useEffect, useState } from "react";
import axios from "axios";

const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async () => {
        try {
            const {data} = await axios.get("http://localhost:5000/get-messages");
            setMessages(prev => [data, ...prev]);
            await subscribe()
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
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

export default LongPulling;