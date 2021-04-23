import React from 'react';
import './App.css';
import Input from './components/Input';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Input />
        <Table />
      </StarWarsProvider>
    </div>
  );
}

export default App;
