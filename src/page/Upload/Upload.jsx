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

function Upload({ onUploadSuccess }) { // Добавил onUploadSuccess как пропс
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null); // Хранение файла
    const [imageSrc, setImageSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Добавлено состояние загрузки

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
            setImageFile(file); // Сохранение файла для отправки на бэк
        }
    };

    const handleSubmit = async () => {
        if (!text || !imageFile) {
            alert("Введите текст и загрузите изображение!");
            return;
        }

        setIsLoading(true); // Начало загрузки

        const formData = new FormData();
        formData.append('text', text);
        formData.append('image', imageFile);

        try {
            const response = await fetch('http://localhost:5000/upload', { // Пример URL бэка
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                onUploadSuccess(result); // Вызов onUploadSuccess для добавления данных в Decomposed
                setText(''); // Сброс полей
                setImageSrc(null);
                setImageFile(null);
            } else {
                alert('Ошибка загрузки данных');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        } finally {
            setIsLoading(false); // Конец загрузки
        }
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
                    <button className="submit-button" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Uploading..." : "→"}
                    </button>
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
