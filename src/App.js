import React from 'react';
import Table from './components/Table';
import Header from './components/Header';
import Provider from './context/Provider';
import './App.css';
import StarWars from './StarWars.svg';

function App() {
  return (
    <Provider>
      <img src={ StarWars } alt=" " width="270px" />
      <p />
      <span>A long time ago in a galaxy far far away...</span>
      <Header />
      <Table />
    </Provider>
  );
}

export default App;

// import React from 'react';
// import Provider from './context/Provider';
// import './App.css';
// import Table from './Components/Table';
// import Header from './Components/Header';

// function App() {
//   return (
//     <Provider>
//       <h1>StarWars</h1>
//       <Header />
//       <Table />
//     </Provider>
//   );
// }

// export default App;
