import Header from './Header.js';
import Main from './Main.js';
import {Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';


function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
