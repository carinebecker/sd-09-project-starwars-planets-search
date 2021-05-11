import React from 'react';
import './App.css';
import TableHeader from './components/TableHeader';
import { Provider } from './provider/Provider';

function App() {
  return (
    <Provider>
      <TableHeader />
    </Provider>
  );
}

export default App;
