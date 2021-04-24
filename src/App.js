import React from 'react';
import Provider from './Context/Provider';
import Table from './Table';

const App = () => (
  <Provider>
    <Table />
  </Provider>
);

export default App;
