import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Provider from './context/provider';

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
