import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import About from './pages/About';


const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{
          marginLeft: '250px', 
          padding: '20px',
        }}>
          <Routes>
            <Route path="/dsad" element={<h1>Home Page</h1>} />
            <Route path="/about" element={<About/>} />
            <Route path="/services" element={<h1>Services Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
