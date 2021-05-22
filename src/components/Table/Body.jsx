import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../../Context/StarWarsContext';

function Body({ data }) {
  const { filters } = useContext(StarWarsContext);
  const { order } = filters;
  const columns = data[0] && Object.keys(data[0]);
  const ONE_LESS = -1;
  if (order.sort === 'ASC') {
    data.sort((a, b) => {
      if (a[order.column] > b[order.column]) return 1;
      if (a[order.column] < b[order.column]) return ONE_LESS;
      return 0;
    });
  } else {
    data.sort((a, b) => {
      if (a[order.column] > b[order.column]) return ONE_LESS;
      if (a[order.column] < b[order.column]) return 1;
      return 0;
    });
  }

  return (
    <>
      {data.map((row) => (
        <tr key={ row.name }>
          {columns
            .filter((header) => header !== 'residents')
            .map((column) => (
              <td
                key={ column }
                name={ column }
                data-testid={ `planet-${column}` }
              >
                { row[column] }
              </td>))}
        </tr>))}
    </>
  );
}

Body.defaultProps = {
  data: [],
};

Body.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
export default Body;
