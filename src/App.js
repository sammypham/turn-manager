import './App.css';

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Logout from './pages/Logout/Logout'
import Setting from './pages/Settings/Settings'
import Businesses from './pages/Businesses/Businesses';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/" element={<Header />}>
        <Route path="/home/:business_id" element={<Home />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/settings/:business_id" element={<Setting />} />
        <Route index element={<Navigate to="/businesses" replace />} /> {/* Default redirection to /home */}
      </Route>
    </Route>
  )
)

function App() {
  console.log(process.env);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
