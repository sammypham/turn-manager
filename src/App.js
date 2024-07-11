import './App.css';

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Logout from './pages/Logout/Logout'
import Setting from './pages/Settings/Settings'
import Businesses from './pages/Businesses/Businesses';
import Index from './pages/Index/Index';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/" element={<Header />}>
        <Route path="/home/:business_id" element={<ProtectedRoute element={Home} />} />
        <Route path="/businesses" element={<ProtectedRoute element={Businesses} />} />
        <Route path="/settings/:business_id" element={<ProtectedRoute element={Setting} />} />
      </Route>

      <Route path="/" index element={<Index />} />
      <Route path="/*" index element={<Navigate to="/" replace />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
