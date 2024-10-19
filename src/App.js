import logo from './logo.svg';
import { createBrowserRouter, RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home'
import Upload from './page/Upload/Upload';
import Decomposed from './page/Decomposed/Decomposed';
import Three from './page/Three/Three';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/upload",
      element: <Upload/>
    },
    {
      path: "/decomposed",
      element: <Decomposed/>
    },
    {
      path: "/3d",
      element: <Three/>
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
