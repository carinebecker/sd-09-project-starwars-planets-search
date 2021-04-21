import React from 'react';
import Table from './components/Table';
import Planets from './context/Planets';

export default function App() {
  return (
    <Planets>
      <Table />
    </Planets>
  );
}
