import React, { useContext, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import loadPlanets from '../services/ApiPlanets';
import ItemPlanet from './ItemPlanet';
import './Table.css';

function Table() {
  const { data, addData } = useContext(StarWarsContext);
  const { filters, addFilterName } = useContext(StarWarsContext);
  const { dataFilter, addDataFilter } = useContext(StarWarsContext);
  const { filterByName } = filters;
  const { name } = filterByName;

  const fetchApi = async () => {
    const planets = await loadPlanets();
    addData(planets);
    addDataFilter(planets);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    const noContain = -1;
    addDataFilter(data.filter((planet) => planet.name.toLowerCase()
      .indexOf(name.toLowerCase()) !== noContain));
  }, [filters]);
  const handleChange = ({ target }) => {
    addFilterName(target.value);
  };

  return (
    <div>
      <h3 className="title">Pesquisa de planetas do Star Wars</h3>
      <p> </p>
      <label htmlFor="Label-name-filter">
        Planetas que incluam
        <input
          data-testid="name-filter"
          id="Label-name-filter"
          type="text"
          value={ name }
          onChange={ handleChange }
        />

      </label>
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

// const planetFiltersInit = {
//   filterByName: {
//     name: '',
//   },
//   filterByNumericValues: [
//     {
//       column: 'population',
//       camparison: 'maior que',
//       value: '100000',
//     },
//   ],
// };
