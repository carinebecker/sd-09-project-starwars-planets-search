import React from 'react';

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

export default Header;
