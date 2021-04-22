import React from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import { Provider } from './context/SWPlanetsContext';

function App() {
  return (
    <Provider>
      <Form />
      <Table />
    </Provider>
  );
}

export default App;
