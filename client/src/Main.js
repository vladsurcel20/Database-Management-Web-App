import React from 'react';
import Home from './Home';
import Specializations from './Specializations/Specializations';
import Technicians from './Technicians/Technicians';
import Projects from './Projects/Projects';
import {Routes, Route} from 'react-router-dom';

const Main = () => {
  return (
    <main 
      style={{
        backgroundImage: 'url(/bi2.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        minHeight: '85vh'
      }}
    >
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/technicians' element={<Technicians />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/specializations' element={<Specializations />} />
        </Routes>
    </main>
  )
}

export default Main