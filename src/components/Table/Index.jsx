import React, { useContext } from 'react';
import StarWarsContext from '../../Context/StarWarsContext';
import Body from './Body';
import Header from './Header';

const Table = () => {
  const { data, isFetching, searchName } = useContext(StarWarsContext);
  return !isFetching ? (
    <table className="table">
      <thead>
        <Header data={ data } />
      </thead>
      <tbody>
        <Body data={ searchName(data) } />
      </tbody>
    </table>

  ) : <span>Carregando ...</span>;
};

export default Table;
