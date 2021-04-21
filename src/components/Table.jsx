import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import requestAPI from '../service/request';
import RenderSelect from './renderSelect';

function Table() {
  const {
    data, setData, filters, setFilters, loading, setLoading } = useContext(MyContext);
  const { filterByName, filterByNumericValues } = filters.filters;
  const [dataFilter, setDataFilter] = useState([]);

  function handleChange({ target }) {
    setFilters({
      ...filters,
      filters: {
        ...filters.filters, filterByName: { name: target.value },
      },
    });
    const filter = data.filter((r) => (
      r.name.includes(target.value)
    ));
    setDataFilter(filter);
  }

  function handleClick() {
    const { value, column, comparison } = filterByNumericValues;
    let filter = [];
    switch (comparison) {
    case 'igual a':
      filter = data.filter((r) => (
        (+r[column]) === (+value)
      ));
      break;
    case 'maior que':
      filter = data.filter((r) => (
        (+r[column]) > (+value)
      ));
      break;
    case 'menor que':
      filter = data.filter((r) => (
        (+r[column]) < (+value)
      ));
      break;
    default:
      return filters;
    }
    // console.log(data);
    setDataFilter(filter);
  }

  useEffect(() => {
    handleClick();
  }, [filterByNumericValues]);

  function renderTable() {
    return (
      <div>
        <label htmlFor="filter">
          Filtrar
          <input
            type="text"
            id="filter"
            value={ filterByName.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
        <RenderSelect data={ dataFilter } />
        <table>
          <thead>
            <tr>
              { Object.keys(dataFilter[0]).map((r) => <th key={ r }>{ r }</th>) }
            </tr>
          </thead>
          <tbody>
            { dataFilter.map((r) => (
              <tr key={ r.name }>
                { Object.values(r).map((obj) => <td key={ obj }>{ obj }</td>) }
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }

  useEffect(() => {
    requestAPI().then((r) => {
      setDataFilter(r);
      return setData(r);
    }).then(() => setLoading(false));
  }, [setData, setLoading]);

  if (loading === false && dataFilter.length > 0) {
    return (
      renderTable()
    );
  }
  if (dataFilter.length === 0) {
    return (
      <div>
        <label htmlFor="filter">
          Filtrar
          <input
            type="text"
            id="filter"
            value={ filterByName.name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
        <h4>Ops, parece que não há planetas com esse nome</h4>
      </div>
    );
  }
  return (
    <h2>Loading...</h2>
  );
}

export default Table;
