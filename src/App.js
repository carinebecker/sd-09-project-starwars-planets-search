import React from 'react';
import './App.css';
import HomePage from './Pages/home';
import Provider from './Providers';

function App() {
  return (
    <Provider>
      <HomePage />
    </Provider>
  );
}

export default App;
