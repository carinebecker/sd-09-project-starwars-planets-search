import React from 'react';
import { Provider } from './context';
import './App.css';

function App() {
  return (
    <Provider>
      <span>Hello, App!</span>
    </Provider>
  );
}

export default App;
