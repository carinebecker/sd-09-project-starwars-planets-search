import React, { useContext } from 'react';
import AppContext from '../appContext/Context';

const Table = () => {
  const { data } = useContext(AppContext);
  const renderRow = () => {
    if (data !== undefined) {
      return (
        <div>
          {data.map((planets) => (
            <td key={ planets.name }>
              <tr>{planets.name}</tr>
              <tr>{ planets.gravity}</tr>
            </td>))}
          <tr>teste</tr>
        </div>
      );
    }
    return <div>.</div>;
  };

  return (
    <div>
      { renderRow() }
    </div>
  );
};

export default Table;
