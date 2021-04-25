import React from 'react';
import { Provider } from './Context';
import { FilterForm, OrderForm, Filters, Table } from './components';
import './App.css';

function App() {
  return (
    <Provider>
      <FilterForm />
      <OrderForm />
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
