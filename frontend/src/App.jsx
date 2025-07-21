import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
// import './App.css'

import GuitarList from "./components/GuitarList";
import GuitarDetail from "./components/GuitarDetail";
import Header from "./components/Header";
import NewGuitarForm from "./components/NewGuitarForm";
import EditGuitarForm from "./components/EditGuitarForm";
import AddStringChange from "./components/AddStringChange";
import EditStringChange from "./components/EditStringChange";

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <main className="container mx-auto px-4 py-4">
            <Routes>
              <Route path="/" element={<Navigate to="/guitars" replace />} />
              <Route path="/guitars" element={<GuitarList />} />
              <Route path="/guitars/new" element={<NewGuitarForm />} />
              <Route path="/guitars/:id/edit" element={<EditGuitarForm />} />
              <Route path="/guitars/:id/add_string_change" element={<AddStringChange />} />
              <Route path="/guitars/:guitarId/setup/:setupId" element={<EditStringChange />} />
              <Route path="/guitars/:id" element={<GuitarDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App;
