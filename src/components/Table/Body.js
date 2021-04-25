import React from 'react';

function Body(data) {
  return (
    <tr>
      { data.map((header, index) => (
        <th key={ index }>{ header }</th>
      )) }
    </tr>
  );
}

export default Body;
