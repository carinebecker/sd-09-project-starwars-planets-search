import React, { useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../provider/Provider';
import InputsComponents from './inputs';

function TableHeader() {
  const obj = {};
  const [inputFilt, setInputFilt] = useState(obj);
  const { data, filters, setFilters, setData } = useContext(StarWarsContext);

  const valuesArray = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const valueFor = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const handleChangeSelect = ({ target: { name, value } }) => {
    setInputFilt({
      ...inputFilt,
      [name]: value,
    });
  };

  const selectsFilter = () => (
    <>
      <select data-testid="column-filter" name="column" onChange={ handleChangeSelect }>
        <option>Select option</option>
        {valuesArray
          .map((element) => <option value={ element } key={ element }>{element}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChangeSelect }
      >
        <option>Select option</option>
        {valueFor
          .map((element) => <option value={ element } key={ element }>{element}</option>)}
      </select>
    </>
  );

  const inputFilter = () => (
    <input data-testid="value-filter" name="value" onChange={ handleChangeSelect } />
  );

  const valuesForFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues,
        inputFilt],
    });
  };

  const btn = () => (
    <button
      type="button"
      data-testid="button-filter"
      onClick={ valuesForFilter }
    >
      Filtrar
    </button>
  );

  useEffect(() => {
    console.log(filters, 'chamou!');
    const xablau = () => {
      if (filters.filterByNumericValues.length === 0) {
        return data;
      }
      const { filterByNumericValues } = filters;

      filterByNumericValues.forEach((element) => {
        const { comparison, column: compareKey, value } = element;
        switch (comparison) {
        case 'maior que':
          setData(
            [...data.filter((planet) => Number(planet[compareKey]) > Number(value))],
          );
          return data;
        case 'menor que':
          setData(
            [...data.filter((planet) => Number(planet[compareKey]) < Number(value))],
          );
          return data;
        case 'igual a':
          setData(
            [...data.filter((planet) => Number(planet[compareKey]) === Number(value))],
          );
          return data;
        default:
          return data;
        }
      });
    };
    xablau();
  }, [filters]);

  if (!data.length) return <h1>Loading...</h1>;

  return (
    <table>
      <InputsComponents />
      <div>
        {selectsFilter()}
        {inputFilter()}
        {btn()}
      </div>
    </table>
  );
}

export default TableHeader;
