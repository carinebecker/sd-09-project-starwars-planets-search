import React from 'react';
import PropTypes from 'prop-types';

function TableFields({ planets }) {
  return (
    <thead>
      <tr>
        {Object.keys(planets[0]).map((field) => (
          <th key={ field }>{field}</th>
        ))}
      </tr>
    </thead>
  );
}

TableFields.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableFields;
