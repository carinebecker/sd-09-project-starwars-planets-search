import React from 'react';
import Tables from './components/Tables';
import Provider from './provider/context';

function App() {
  return (
    <Provider>
      <Tables />
    </Provider>
  );
}

export default App;
