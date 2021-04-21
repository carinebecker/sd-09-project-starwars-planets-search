import React, { useEffect, useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import requestAPI from '../service/request';

function Table() {
  const {
    data, setData, filters, setFilters, loading, setLoading } = useContext(MyContext);
  const { filterByName } = filters.filters;
  const [dataFilter, setDataFilter] = useState([]);

  function handleChange({ target }) {
    setFilters({
      filters: {
        filterByName: {
          name: target.value,
        },
      },
    });
    const filter = data.filter((r) => (
      r.name.includes(target.value)
    ));
    console.log(filter);
    setDataFilter(filter);
  }

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
