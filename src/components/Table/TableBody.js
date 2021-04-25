import React from 'react';
import PropTypes from 'prop-types';

function TableBody({ planets }) {
  return (
    <tbody>
      {planets && planets.map((planet) => (
        <tr key={ planet.name }>
          {Object.values(planet).map((value, index) => (
            <td key={ index }>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBody;
