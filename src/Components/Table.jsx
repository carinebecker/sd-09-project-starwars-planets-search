import React from 'react';
import Form from './Form';
import TableBody from './TableBoddy';
import TableHeader from './TableHeader';

const GalaxyTable = () => (
  <div>
    <Form />

    <table>
      <TableHeader />
      <TableBody />
    </table>

  </div>
);

export default GalaxyTable;
