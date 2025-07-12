import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import './App.css'

import GuitarList from "./components/GuitarList";
import GuitarDetail from "./components/GuitarDetail";
import Header from "./components/Header";
import NewGuitarForm from "./components/NewGuitarForm";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/guitars" replace />} />
              <Route path="/guitars" element={<GuitarList />} /> {/* One to list guitars */}
              <Route path="/guitars/new" element={<NewGuitarForm />} /> {/* One to create guitars */}
              <Route path="/guitars/:id" element={<GuitarDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App;
