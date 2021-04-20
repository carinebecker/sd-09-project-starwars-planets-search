import React from 'react';
import Input from './components/Input';
import Table from './components/Table';
// import starsWContext from './context/starsWContext';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Input />
      <Table />
    </Provider>
  );
}

export default App;
