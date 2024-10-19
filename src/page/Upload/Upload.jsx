import React, { useState, useEffect } from 'react';
import './Upload.css';
import { ReactComponent as Book } from './icons/archive.svg';
import { ReactComponent as Calendar } from './icons/calendar.svg';
import { ReactComponent as Bookmark } from './icons/bookmark.svg';
import { ReactComponent as Cloud } from './icons/download-cloud.svg';
import { ReactComponent as File } from './icons/file.svg';
import { ReactComponent as Inst } from './icons/instagram.svg';
import { ReactComponent as Logout } from './icons/log-out.svg';
import { ReactComponent as ClipIcon } from './icons/paperclip.svg';  
import { useNavigate } from 'react-router-dom';

function Upload({onUploadComplete}) { 
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null); 
    const [imageSrc, setImageSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [status, setStatus] = useState(null); // Для статуса
    const [imageId, setImageId] = useState(null); // Для хранения image_id


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
            setImageFile(file); 
        }
    };

    const checkStatus = async (imageId) => {
        const statusUrl = `http://192.168.0.127:8000/api/genai/3d/status/${imageId}`; 
        console.log(`Проверка статуса для image_id: ${imageId}`);
        try {
            const response = await fetch(statusUrl, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Ошибка получения статуса');
            }
            const result = await response.json();
            return result; 
            console.log("Status: ", result); 
        } catch (error) {
            console.error('Ошибка при получении статуса:', error);
        }
    };

    useEffect(() => {
        let interval;
        if (imageId) {
            interval = setInterval(() => {
                checkStatus(imageId).then((result) => {
                    console.log(result);
                    if (result.status === 'In progress') {
                        setStatus(result);  
                    } else {
                       
                        console.log('12');
                        clearInterval(interval); // Останавливаем интервал
                        onUploadComplete(result.data);
                        navigate('/decomposed');
                    }
                }).catch((error) => {
                    console.error('Ошибка при проверке статуса:', error);
                    clearInterval(interval); // Останавливаем интервал в случае ошибки
                });
            }, 5000); // Проверка каждые 5 секунд
        }
    
        return () => {
            if (interval) {
                clearInterval(interval); // Очищаем интервал при размонтировании компонента
            }
        };
    }, [imageId, navigate]); // Запускается при изменении imageId

    const handleSubmit = async () => {
        if (!imageFile && !text) {
            alert("Пожалуйста, загрузите изображение или введите текст.");
            return;
        }

        setIsLoading(true); 

        const formData = new FormData();
        if (imageFile) {
            formData.append('upload_image', imageFile); // Добавляем изображение, если оно есть
        }
        if (text) {
            formData.append('text', text); // Добавляем текст, если он введен
        }

        try {
            console.log("Отправка данных на бэкэнд...");
            const response = await fetch('http://192.168.0.127:8000/api/genai/3d/generator', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                console.log("Полный объект ответа: ", result); 
                // Извлекаем image_id из объекта
                const imageId = result.image_id;  // Извлекаем image_id из объекта
                console.log("Получен image_id: ", imageId); // Выводим правильный image_id
                setText(''); 
                setImageSrc(null);
                setImageFile(null);

                // Сохраняем image_id и запускаем проверку статуса
                if (imageId) {
                    setImageId(imageId); // Сохраняем image_id для интервала
                    checkStatus(imageId); // Передаем правильный image_id в функцию для проверки статуса
                } else {
                    console.error('Ошибка: image_id не найден в ответе');
                }
            } else {
                console.error('Ошибка загрузки данных:', result);
            }
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        } finally {
            setIsLoading(false); 
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

                {/* Если статус in progress, показываем загрузку */}
                {status && status.message === 'In progress' ? (
                    <div className="loading-container">
                        <h3>Загрузка...</h3>
                        {/* Можно добавить индикатор загрузки */}
                    </div>
                ) : (
                    status && (
                        <div className="status-container">
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Upload;
