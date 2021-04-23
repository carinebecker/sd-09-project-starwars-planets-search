import React from 'react';
import './App.css';
import fetchApi from './helpers/FetchApi';

function App() {
  fetchApi();
  return (
    <span>Bora fazer esse trem!!!</span>
  );
}

export default App;
