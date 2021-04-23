import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, filters, setPlanetsResults, planetsResults } = useContext(PlanetsContext);

  const loading = () => <span>Carregando...</span>;

  useEffect(() => {
    const { filterByName: { name }, filterByNumericValues } = filters;
    const { column, comparison, value } = filterByNumericValues[0];

    const planetsByName = data.filter((planet) => (
      planet.name.toLowerCase().includes(name)));

    if (comparison === 'maior que') {
      setPlanetsResults(planetsByName.filter((planet) => (
        Number(value) < Number(planet[column])
      )));
    }
    if (comparison === 'menor que') {
      setPlanetsResults(planetsByName.filter((planet) => (
        Number(value) > Number(planet[column])
      )));
    }
    if (comparison === 'igual a') {
      setPlanetsResults(planetsByName.filter((planet) => (
        Number(value) === Number(planet[column])
      )));
    }
    if (comparison === '') {
      setPlanetsResults(planetsByName);
    }
  }, [data, filters, setPlanetsResults]);

  return (
    <section>
      <table>
        <thead>
          <tr>
            { data.length === 0 ? loading() : Object.keys(data[0]).map((key) => (
              <th key={ key }>{key}</th>)) }
          </tr>
        </thead>
        <tbody>
          { planetsResults && planetsResults.map((planet) => (
            <tr key={ planet.name }>
              { Object.values(planet).map((attribute) => (
                <td key={ attribute }>{attribute}</td>)) }
            </tr>
          )) }
        </tbody>
      </table>
    </section>
  );
}

export default Table;
