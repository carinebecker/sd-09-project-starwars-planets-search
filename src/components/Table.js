import React from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Table() {
  return (
    <StarWarsContext.Consumer>
      {(context) => (
        <table>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </table>
      )}
    </StarWarsContext.Consumer>
  );
}

export default Table;
