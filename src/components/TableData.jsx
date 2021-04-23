import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';
import useLogic from '../hooks/useLogic';

export default function TableData() {
  const { data, tableContent } = useContext(Context);
  const { filteredPlanets } = useLogic();

  function renderTableHeader() {
    const columns = Object.keys(data[0]);
    return columns.map((item) => (
      <th key={ item } title={ item.charAt(0).toUpperCase() + item.slice(1) }>
        {item.charAt(0).toUpperCase() + item.slice(1).replace('_', ' ')}
      </th>
    ));
  }

  function isLoading() {
    return <td>Carregando...</td>;
  }

  useEffect(() => {
    if (data) filteredPlanets();
  }, [data, filteredPlanets]);

  function renderTableContent() {
    const columns = Object.keys(data[0]);

    return (
      <>
        {tableContent.map((row, indexRow) => (
          <tr key={ indexRow }>
            {columns.map((item, indexCell) => {
              if (indexCell === 0) {
                return (
                  <td
                    key={ row[item] }
                    data-testid="planet-name"
                    style={ {
                      border: '1px solid black',
                      textAlign: 'center',
                      fontStyle: 'italic',
                      padding: '10px',
                    } }
                  >
                    {row[item]}
                  </td>
                );
              }
              return (
                <td
                  key={ row[item] }
                  style={ {
                    border: '1px solid black',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    padding: '10px',
                  } }
                >
                  {row[item]}
                </td>
              );
            })}
          </tr>
        ))}
      </>
    );
  }

  return (
    <table>
      <thead>
        <tr>{data[0] ? renderTableHeader() : isLoading()}</tr>
      </thead>
      <tbody>{data[0] ? renderTableContent() : null}</tbody>
    </table>
  );
}
