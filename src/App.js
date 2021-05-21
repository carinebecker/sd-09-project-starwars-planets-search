import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    // Req 1 - 1.6.2 - Forma de prover esse tudo isso para toda a aplicação - maneira elegante
    // Obs: Para abranger form e table, o planetsProvider deve ter a propriedade { children }
    <PlanetsProvider>
      <Form />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
