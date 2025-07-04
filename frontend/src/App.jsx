import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import GuitarList from "./components/GuitarList"
import GuitarDetail from "./components/GuitarDetail"

function App() {
  return (
    <>
      <Router>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/guitars">Home</Link>
            </li>
          </ul>
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/guitars" replace />} />
            <Route path="/guitars" element={<GuitarList />} />
            <Route path="/guitars/:id" element={<GuitarDetail />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;
