import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Addgame from './components/Addgame';
import VideoGameDetails from './components/VideoGameDetails';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/addgame" element={<Addgame/>}/>
        <Route path="/videogame/:id" element={<VideoGameDetails/>}/>
        <Route path="*" element={<NotFoundPage/>}/>    
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
