import React from 'react';
import PropTypes from 'prop-types';

function TableFields({ planets }) {
  return (
    <tbody>
      {planets.map((planet) => (
        <tr key={ planet.name }>
          {Object.values(planet).map((value, index) => (
            <td key={ index }>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableFields.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableFields;
