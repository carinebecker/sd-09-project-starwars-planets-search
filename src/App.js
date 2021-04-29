import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <Form />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

// Projeto feito com ajuda da rosiele, muito obrigado pela força
