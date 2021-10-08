import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, author, room }) {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage) {
            const userMessage = {
                room,
                author,
                currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", userMessage);
            setMessageList((list) => [...list, userMessage]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", data => {
            setMessageList((list) => [...list, data]);
        })
    }, [socket])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map(data => (
                        <div className="message" id={data.author === author ? "you" : "other"}>
                            <div className="message-content">
                                <p>{data.currentMessage}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{data.time}</p>
                                <p id="author">{data.author}</p>
                            </div>
                        </div>
                    ))}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
