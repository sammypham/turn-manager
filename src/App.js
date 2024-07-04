import logo from './logo.svg';
import './App.css';

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/login" element={<Login/>} />
    </Route>
    
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
