import React from 'react';
// import logo from '../Common/abertura.gif';
import '../Common/Services/SWindex.css';
import Table from '../Common/Components/Table';

function StarWarsDatabase() {
  return (
    <div className="container">
      {/* <img className="star-wars-logo" src={ logo } alt="Star Wars Logo" /> */}
      <h1>Star Wars Planets Database</h1>
      <section>
        <Table />
      </section>
    </div>
  );
}

export default StarWarsDatabase;
