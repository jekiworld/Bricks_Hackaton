import React, {useState} from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three-stdlib'; // Proper loader import
import './Three.css';

function ThreeDModel({object_url}) {
  const obj = useLoader(OBJLoader, object_url);
  return (
    <Canvas style={{ background: '#f0f0f0', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={obj} scale={1} />
      <OrbitControls />
    </Canvas>
  );
}

function Chat({des}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

function Three({object_url}) {
  return (
    <div className="threeDChat">
      <div className="threeD-container">
        <ThreeDModel object_url={object_url}/>
      </div>
      <div className="chat-panel">
        <div className="title-text">Brick it!</div> {/* Title as per your image */}
        <div className="quick-response">
          <button className="quick-response-button">Brick my laptop</button>
          <button className="quick-response-button">
            Brick the microwave apart into many pieces
          </button>
          <button className="quick-response-button">Brick this food</button>
        </div>
        <Chat />
      </div>
    </div>
  );
}

export default Three;
