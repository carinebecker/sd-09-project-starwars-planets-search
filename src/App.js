import React from 'react';
import Provider from './Context/Provider';
import Table from './Components/Table';
import Form from './Components/Form';

const App = () => (
  <Provider>
    <Form />
    <Table />
  </Provider>
);

export default App;
