import React from 'react';
import { Provider } from './Context';
import { Table, Form, Filters } from './components';
import './App.css';

function App() {
  return (
    <Provider>
      <Form />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
