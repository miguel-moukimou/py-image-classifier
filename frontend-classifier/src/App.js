import React from 'react';
import './App.css';
import Classifier from './components/Classifier/Classifier';
import ImageList from './components/ImageList/ImageList';
import Navigation from './components/Navigation/Navigation';
import {Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className='App'>
        <Routes>
          <Route exact path='/' element={< Classifier/>}/>
          <Route path='/list' element={< ImageList/>} />
          <Route exact path='*' element={< Classifier/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
