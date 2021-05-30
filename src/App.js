import React from 'react';
import { Route } from 'react-router-dom';
import Index from './pages/index';
import ContextProvider from './context/Context';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <Route path="/" component={ Index } />
    </ContextProvider>
  );
}

export default App;
