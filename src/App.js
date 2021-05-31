import React from 'react';
import './App.css';
import SWProvider from './context/SWProvider';
import Table from './components/Table';
import InputFilter from './components/InputFilter';
import Order from './components/Order';

export default function App() {
  return (
    <SWProvider>
      <InputFilter />
      <Order />
      <Table />
    </SWProvider>
  );
}
