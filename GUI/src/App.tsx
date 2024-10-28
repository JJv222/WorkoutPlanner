import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Trenings from './pages/Trenings';
import Weights from  './pages/weightPage/Weights';


const App: React.FC = () => {
  return (
    <Router>
        <Sidebar />
          <Routes>
            <Route path="/trenings" element={<Trenings/>} />
            <Route path="/weights" element={<Weights/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
    </Router>
  );
};

export default App;
