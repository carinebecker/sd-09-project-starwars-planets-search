import React from 'react';
import headerNames from '../data/headerNames';

const RenderHeader = () => (
  <tr>
    {
      headerNames.map((header) => (
        <td key={ header }>
          <th>{ header }</th>
        </td>))
    }
  </tr>
);

export default RenderHeader;
