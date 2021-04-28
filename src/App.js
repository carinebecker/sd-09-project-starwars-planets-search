import React from 'react';
import TodoProvaider from './components/TodoProvaider';
import Table from './components/Table';

function App() {
  return (
    <div>
      <TodoProvaider>
        <Table />
      </TodoProvaider>
    </div>
  );
}

export default App;
