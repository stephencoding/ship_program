import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Analysis from './pages/Analysis';
import Demo from './pages/Demo';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VesselDetail from './pages/VesselDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />
          <Route path="vessel/:id" element={<VesselDetail />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="search" element={<div>Search Page Placeholder</div>} />
          <Route path="analysis" element={<Analysis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
