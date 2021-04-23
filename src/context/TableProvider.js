import React, {} from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
    (async () => {
      const results = await fetch(endpoint)
        .then((response) => response.json());
      setPlanets(results);
    })();
    // console.log(planets);
  }, []);

  return (
    <table>
      <TableContext.Provider value={ planets }>
        { children }
      </TableContext.Provider>
    </table>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node, // verificar certinho depois
}.isRequired;

export default TableProvider;
