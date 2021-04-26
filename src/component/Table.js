import React, { useContext, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import loadPlanets from '../services/ApiPlanets';
import ItemPlanet from './ItemPlanet';
import './Table.css';

function Table() {
  const { data, addData, filters, addFilterName, dataFilter, addDataFilter,
    fieldsFilter, addFieldsFilter, arrayColumn, addArrayColumn, addFilterNumeric,
  } = useContext(StarWarsContext);
  const { filterByName, filterByNumericValues } = filters;
  const { name } = filterByName;
  const { column, comparison, value } = fieldsFilter;

  const fetchApi = async () => {
    const planets = await loadPlanets();
    addData(planets);
    addDataFilter(planets);
  };

  const compareValues = (filterColumn, filterComparison, filterValue) => {
    switch (filterComparison) {
    case 'maior que':
      return filterColumn > filterValue;

    case 'igual a':
      return filterColumn === filterValue;

    case 'menor que':
      return filterColumn < filterValue;

    default:
      return false;
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    const noContain = -1;
    addDataFilter(data.filter((planet) => planet.name.toLowerCase()
      .indexOf(name.toLowerCase()) !== noContain));
    filterByNumericValues.forEach((filter) => {
      addDataFilter(dataFilter.filter((planet) => compareValues(
        parseInt(planet[filter.column], 10),
        filter.comparison, parseInt(filter.value, 10),
      )));
    });
  }, [filters]);

  const handleChangeName = ({ target }) => {
    addFilterName(target.value);
  };

  const handleChangeColumn = ({ target }) => {
    addFieldsFilter(target.value, comparison, value);
  };

  const handleChangeComparison = ({ target }) => {
    addFieldsFilter(column, target.value, value);
  };

  const handleChangeValue = ({ target }) => {
    addFieldsFilter(column, comparison, target.value.toString());
  };

  const addFilterButton = () => {
    addFilterNumeric(column, comparison, value);
    addArrayColumn(arrayColumn.filter((col) => col !== column));
  };

  return (
    <div>
      <h3 className="title">Pesquisa de planetas do Star Wars</h3>
      <p> </p>
      <label htmlFor="Label-name-filter" className="form-plant">
        Planetas que incluam
        <input
          data-testid="name-filter"
          id="Label-name-filter"
          type="text"
          value={ name }
          onChange={ handleChangeName }
        />

      </label>
      <label htmlFor="label-column" className="form-column">
        Coluna
        <select
          data-testid="column-filter"
          id="label-column"
          name="column"
          type="text"
          value={ column }
          defaultValue={ arrayColumn[0] }
          onChange={ handleChangeColumn }
        >
          {arrayColumn.map((col) => (
            <option key={ col } value={ col }>{ col }</option>)) }
        </select>
      </label>
      <label htmlFor="label-comparison" className="form-comparison">
        Coluna
        <select
          data-testid="comparison-filter"
          id="label-comparison"
          name="comparison"
          type="text"
          value={ comparison }
          defaultValue="maior que"
          onChange={ handleChangeComparison }
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      <label htmlFor="label-value" className="form-value">
        Coluna
        <input
          data-testid="value-filter"
          id="label-value"
          name="value"
          type="number"
          value={ value }
          onChange={ handleChangeValue }
        />
      </label>
      <button
        data-testid="button-filter"
        className="add-button"
        type="button"
        onClick={ addFilterButton }
      >
        Adicionar
      </button>
      <table border="0">
        <thead>
          <tr>
            <th className="name">Nome</th>
            <th className="rotation">Rotação</th>
            <th className="orbital">Período Orbital</th>
            <th className="diameter">Diâmetro</th>
            <th className="climate">Clima</th>
            <th className="gravity">Gravidade</th>
            <th className="terrain">Terreno</th>
            <th className="surface">Superfície</th>
            <th className="population">População</th>
            <th className="films">Filmes</th>
            <th className="created">Criação</th>
            <th className="edited">Editado</th>
            <th className="url">Url</th>
          </tr>
        </thead>
        <tbody>
          {
            dataFilter.map((planet) => (
              <ItemPlanet
                name={ planet.name }
                rotation={ planet.rotation_period }
                orbital={ planet.orbital_period }
                diameter={ planet.diameter }
                climate={ planet.climate }
                gravity={ planet.gravity }
                terrain={ planet.terrain }
                surface={ planet.surface_water }
                population={ planet.population }
                films={ planet.films[0] }
                created={ planet.created }
                edited={ planet.edited }
                url={ planet.url }
                key={ planet.name }
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
