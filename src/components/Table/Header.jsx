import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const { data } = props;
  const headers = data[0];
  return (
    <tr>
      { Object.keys(headers)
        .filter((header) => header !== 'residents')
        .map((header, index) => (
          <th key={ index }>{ header }</th>
        )) }
    </tr>
  );
}

Header.propTypes = {
  data: PropTypes.arrayOf(PropTypes.Object).isRequired,
};

export default Header;
