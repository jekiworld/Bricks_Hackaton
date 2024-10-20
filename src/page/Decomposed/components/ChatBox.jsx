import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = ({ partName, onSendMessage }) => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        if (message.trim() === "") return;

        setChatHistory(prev => [...prev, { sender: "You", text: message }]);

        const response = await onSendMessage(message);
        
        setChatHistory(prev => [...prev, { sender: partName, text: response }]);

        setMessage("");
    };

    return (
        <div className="chat-box">
            <div className="chat-header">
                <strong>Chat with {partName}</strong>
            </div>
            <div className="chat-body">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={msg.sender === "You" ? "user-message" : "part-message"}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Ask me anything..." 
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
 