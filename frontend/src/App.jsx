import React from 'react';
import Home from './components/home';
import Search from './components/search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-white via-yellow-300 to-pink-500 flex flex-col">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Search' element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
