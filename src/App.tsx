import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* Add more routes here later */}
          <Route path="search" element={<div>Search Page Placeholder</div>} />
          <Route path="analysis" element={<div>Analysis Page Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
