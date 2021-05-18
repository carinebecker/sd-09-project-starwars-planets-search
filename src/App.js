import React from 'react';
import Home from './pages/Home';
import Provider from './context/ProviderContext';
import './App.css';

function App() {
  return (
    <Provider>
      <div className="App">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
