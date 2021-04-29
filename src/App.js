import React from 'react';

import { Planets } from './services/api';
import Table from './components/table';

function App() {
  return (
    <Planets>
      <Table />
    </Planets>
  );
}

export default App;
