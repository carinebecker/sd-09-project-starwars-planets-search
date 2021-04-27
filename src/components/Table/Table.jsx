import React, { useContext } from 'react';
import StarWarsContext from '../../Context/StarWarsContext';
import Body from './Body';
import Header from './Header';

const Table = () => {
  const { data } = useContext(StarWarsContext);
  return data.length !== 0 ? (
    <table className="table">
      <thead>
        <Header data={ data } />
      </thead>
      <tbody>
        <Body data={ data } />
      </tbody>
    </table>

  ) : <span>Carregando ...</span>;
};

export default Table;
