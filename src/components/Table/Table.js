import React, { useContext } from 'react';
import StarWarsContext from '../../Context/StarWarsContext';
import Header from './Header';
/* import Body from './Body'; */

const Table = () => {
  const { isFetching, data } = useContext(StarWarsContext);
  return !isFetching ? (
    <table>
      <thead>
        <Header data={ data } />
      </thead>
      {/*       <tbody>
        <Body data={ data } />
      </tbody> */}
    </table>

  ) : <span>Carregando ...</span>;
};

export default Table;
