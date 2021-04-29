import React, { useContext, useState } from 'react';
import { TableContext } from '../Context/TableContext';

const Form = () => {
  const [select, setSelect] = useState(
    [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  );

  const {
    filterPlanet,
    filterPlanetDetails,
    filterPlanetComparison,
    filterPlanetPopulation,
    filters: {
      filterByName: {
        name,
      },
      planetComparison,
      planetPopulation,
    },
    planetDetails,
    controlFilters,
  } = useContext(TableContext);

  const resetFilter = () => {
    // console.log(select.filter((filterOption) => filterOption !== planetDetails), planetDetails);
    setSelect(select.filter((filterOption) => filterOption !== planetDetails));
    // se um filtro for selecionado ele sai das opções
  };

  return (
    <form action="">
      <label htmlFor="seacrh">
        Pesquisar planeta
        <input
          name="seacrh"
          type="text"
          value={ name }
          onChange={ filterPlanet }
          data-testid="name-filter"
        />
      </label>
      <label htmlFor="filter">
        Filtrar planeta por propreidade
        <select
          name="filter"
          value={ planetDetails }
          onChange={ filterPlanetDetails }
          data-testid="column-filter"
        >
          {select.map((option) => (
            <option key={ option } value={ option }>{ option }</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          name="comparison"
          value={ planetComparison }
          onChange={ filterPlanetComparison }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="number">
        <input
          type="number"
          value={ planetPopulation }
          onChange={ filterPlanetPopulation }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ () => { controlFilters(); resetFilter(); } }
        data-testid="button-filter"
      >
        Aplicar filtro
      </button>
    </form>
  );
};

export default Form;
