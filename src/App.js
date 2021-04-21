import React from 'react';
import { Provider } from './Context';
import { Table, Form } from './components';
import './App.css';

function App() {
  return (
    <Provider>
      <Form />
      <Table />
    </Provider>
  );
}

export default App;
