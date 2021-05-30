import React from 'react';
import ContextProvider from './context/Context';
import './App.css';
import Form from './components/FilterForm';
import OrderForm from './components/OrderForm';
import Filters from './components/Filters';
import Table from './components/Table';

function App() {
  return (
    <ContextProvider>
      <Form />
      <OrderForm />
      <Filters />
      <Table />
    </ContextProvider>
  );
}

export default App;
