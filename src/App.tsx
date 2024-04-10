import React from 'react';
import './App.css';
import Kanbas from './Kanbas';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from "react-router";
import Signin from './Users/Signin';
import Signup from './Users/Signup';

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Signin" />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
