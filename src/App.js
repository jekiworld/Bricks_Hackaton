import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home'
import Upload from './page/Upload/Upload';
import Decomposed from './page/Decomposed/Decomposed';
import Three from './page/Three/Three';
import { useState } from 'react';

function App() {
  // Состояние для хранения передаваемых данных
  const [items, setItems] = useState([]);
  const [objectUrl, setObjectUrl] = useState(null)
  // Функция для обновления данных, которая будет передана в Upload
  const handleDataFromUpload = (newItems) => {
    setItems(newItems);  // Обновляем состояние с элементами
  };

  const handleObjectUrl = (newUrl) => {
    setObjectUrl(newUrl);  // Обновляем состояние с элементами
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/upload",
      element: <Upload onUploadComplete={handleDataFromUpload} />  // Передаем функцию для обновления
    },
    {
      path: "/decomposed",
      element: <Decomposed items={items} handleObjectUrl={handleObjectUrl}/>  // Передаем данные в Decomposed
    },
    {
      path: "/3d",
      element: <Three object_url={objectUrl}/>
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
