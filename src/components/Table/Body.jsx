import React from 'react';
import PropTypes from 'prop-types';

function Body({ data }) {
  const columns = data[0] && Object.keys(data[0]);
  console.log(data);
  return (
    <>
      {data.map((row) => (
        <tr key={ row.name }>
          {columns
            .filter((header) => header !== 'residents')
            .map((column) => <td key={ column }>{ row[column] }</td>)}
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
