import React from 'react';
import './App.css';
import Input from './components/Input';
import Selectors from './components/Selectors';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Input />
        <Selectors />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
