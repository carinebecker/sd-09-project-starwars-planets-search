import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../MyContext';

function Table() {
  const {
    data,
    setDataToChange,
    isLoading,
    keysData,
    dataToChange,
    filters,
    setColumnFilter,
    columnFilter,
    setFilter,
  } = useContext(MyContext);
  const [filterByNumber, setFilterByNumber] = useState();

  const deletCombineFilters = ({ target }) => {
    const newFiltersCombine = filterByNumber
      .filter((element) => target.name !== element.column);
    setFilterByNumber(newFiltersCombine);
    setColumnFilter([...columnFilter, target.name]);
    setDataToChange(data);
    setFilter(
      (prevState) => ({ ...prevState, filterByNumericValues: newFiltersCombine }),
    );
  };

  useEffect(() => {
    if (filters.filterByNumericValues.length === 0) {
      setFilterByNumber(false);
    } else {
      setFilterByNumber(filters.filterByNumericValues);
    }
  }, [filters.filterByNumericValues]);

  return (isLoading ? <p>Loading...</p> : (
    <div>
      {filterByNumber ? filterByNumber.map((element) => (
        <div data-testid="filter" key={ element.column }>
          <button
            type="button"
            onClick={ deletCombineFilters }
            name={ element.column }
          >
            {`${element.column} | ${element.comparison} | ${element.value} | X`}

            {/* <button type="button">X</button> */}
          </button>
        </div>

      )) : null}
      <table>
        <thead>
          <tr>
            {keysData
              .filter((element) => element !== 'residents')
              .map((newElement) => (
                <th key={ newElement }>
                  <h3>{newElement}</h3>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {dataToChange
            .map((item) => (
              <tr key={ Math.random() }>
                <td>
                  {item.name}
                </td>
                <td>
                  {item.rotation_period}
                </td>
                <td>
                  {item.orbital_period}
                </td>
                <td>
                  {item.diameter}
                </td>
                <td>
                  {item.climate}
                </td>
                <td>
                  {item.gravity}
                </td>
                <td>
                  {item.terrain}
                </td>
                <td>
                  {item.surface_water}
                </td>
                <td>
                  {item.population}
                </td>
                <td>
                  {item.films.map((film) => film)}
                </td>
                <td>
                  {item.created}
                </td>
                <td>
                  {item.edited}
                </td>
                <td>
                  {item.url}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
  );
}

export default Table;
