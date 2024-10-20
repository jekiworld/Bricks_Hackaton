import React, { useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib'; 
import './Three.css';

function ThreeDModel({ object_url }) {
  const obj = useLoader(OBJLoader, 'http://192.168.0.127:8000/media/tmp_wxt8yt6.obj');
  return (
    <Canvas style={{ background: '#f0f0f0', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={obj} scale={1} />
      <OrbitControls />
    </Canvas>
  );
}

function Chat({ des }) {

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  console.log(apiKey)
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessages([...messages, { sender: 'User', text: userMessage }]);
    setMessage('');
    setLoading(true);

    const prompt = `You are the video card on PC. You should only answer regarding your functionality and how you work. Here is a user's question: "${userMessage}"`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`, 
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are the video card on PC. You should only answer regarding your functionality and how you work.' },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 150,
        }),
      });

      const data = await response.json();
      const gptReply = data.choices[0].message.content.trim(); 

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'GPT', text: gptReply },
      ]);
    } catch (error) {
      console.error('Error interacting with GPT:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'GPT', text: 'Error getting response from GPT.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

function Three({ object_url }) {
  return (
    <div className="threeDChat">
      <div className="threeD-container">
        <ThreeDModel object_url={object_url} />
      </div>
      <div className="chat-panel">
        <div className="title-text">Brick it!</div> 
        
        <Chat />
      </div>
    </div>
  );
}

export default Three;
