import React, { useState } from 'react';
import './Upload.css';
import { ReactComponent as Book } from './icons/archive.svg';
import { ReactComponent as Calendar } from './icons/calendar.svg';
import { ReactComponent as Bookmark } from './icons/bookmark.svg';
import { ReactComponent as Cloud } from './icons/download-cloud.svg';
import { ReactComponent as File } from './icons/file.svg';
import { ReactComponent as Inst } from './icons/instagram.svg';
import { ReactComponent as Logout } from './icons/log-out.svg';
import { ReactComponent as ClipIcon } from './icons/paperclip.svg';  // Добавляем иконку скрепки
import { useNavigate } from 'react-router-dom';

function Upload() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/decomposed');
      };
    const [text, setText] = useState('');
    const [imageSrc, setImageSrc] = useState(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoClick = () => {
        alert("Открыть камеру для съёмки фото");
    };

    const handleSubmit = () => {
        alert(`Text submitted: ${text}`);
        setText('');  
    };

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-icon"><img className='plus' src="/plus.png" alt="plus" /></div>
                <div className="sidebar-icon"><Book width="15" height="15" /></div>
                <div className="sidebar-icon"><Calendar width="15" height="15" /></div>
                <div className="sidebar-icon"><Bookmark width="15" height="15" /></div>
                <div className="sidebar-icon"><Cloud width="15" height="15" /></div>
                <div className="sidebar-icon"><File width="15" height="15" /></div>
                <div className="sidebar-icon"><Inst width="15" height="15" /></div>
                <div className="sidebar-icon_down"><Logout width="15" height="15" /></div>
            </aside>

            <div className="container">
                <h1>Brick it!</h1>
                <div className="input-container">
                    <div className="clip-icon">
                        <label htmlFor="file-upload">
                            <ClipIcon width="20" height="20" />
                        </label>
                        <input 
                            type="file" 
                            id="file-upload" 
                            accept="image/*" 
                            onChange={handleFileChange}
                            className="file-input" 
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder="For example laptop..." 
                        value={text} 
                        onChange={handleTextChange}
                        className="text-input"
                    />
                    <button className="submit-button" onClick={handleSubmit} >→</button>
                </div>


                <div className="suggestions">
                    <button className="suggestion">Brick my laptop</button>
                    <button className="suggestion">Brick the microwave apart into many pieces</button>
                    <button className="suggestion">Brick this food</button>
                </div>

                {imageSrc && (
                    <div className="image-preview">
                        <img src={imageSrc} alt="Uploaded" className="uploaded-image" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Upload;
