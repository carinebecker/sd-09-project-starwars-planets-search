import React from 'react';
import './App.css';
import Provider from './provider/StarWarsProvider';
import NewApp from './NewApp';

function App() {
  return (
    <Provider>
      <NewApp />
    </Provider>
  );
}

export default App;
