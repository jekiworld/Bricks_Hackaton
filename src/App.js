import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home'
import Upload from './page/Upload/Upload';
import Decomposed from './page/Decomposed/Decomposed';
import Three from './page/Three/Three';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [objectUrl, setObjectUrl] = useState(null)
  const handleDataFromUpload = (newItems) => {
    setItems(newItems);  
  };

  const handleObjectUrl = (newUrl) => {
    setObjectUrl(newUrl);  
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/upload",
      element: <Upload onUploadComplete={handleDataFromUpload} />  
    },
    {
      path: "/decomposed",
      element: <Decomposed items={items} handleObjectUrl={handleObjectUrl}/>  
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
