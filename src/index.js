import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import testData from './testData';

window.fetch = async () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(testData),
});

ReactDOM.render(<App />, document.getElementById('root'));
