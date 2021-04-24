import React, { useContext, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import YodaContext from '../local_resources/Context';
import GetPlanets from '../local_resources/services/GetPlanets';
import KeyGenerator from '../local_resources/KeyGenerator';
import MainNavBar from './MainNavBar';
import './PlanetsList.css';

const gen = KeyGenerator();

const generateHeader = (keys) => {
  const headers = keys.map(
    (ke) => (<th key={ gen.next().value }>{ ke }</th>),
  );
  return headers;
};

const generateRowData = (values) => {
  const rowData = values.map((value) => (<td key={ gen.next().value }>{ value }</td>));
  return rowData;
};
const generateRows = (planets) => {
  const rows = planets.map((planet) => (
    <tr
      role="row"
      key={ gen.next().value }
    >
      { generateRowData(Object.values(planet)) }
    </tr>
  ));
  return rows;
};

const getFilteredPlanets = (comparison, column, value, allPlanets) => {
  let planets = [];
  switch (comparison) {
  case 'maior que':
    planets = allPlanets.filter(
      (planet) => (parseInt(planet[column], 10) > parseInt(value, 10)),
    );
    return planets;
  case 'menor que':
    planets = allPlanets.filter(
      (planet) => (parseInt(planet[column], 10) < parseInt(value, 10)),
    );
    return planets;
  default:
    planets = allPlanets.filter(
      (planet) => (parseInt(planet[column], 10) === parseInt(value, 10)),
    );
    return planets;
  }
};

const sortPlanets = (planets, order) => {
  const BIGGER = 1;
  const MINOR = -1;
  if (order.sort === 'ASC') {
    return planets.sort((a, b) => (a[order.column] > b[order.column] ? BIGGER : MINOR));
  }
  return planets.sort((a, b) => (a[order.column] < b[order.column] ? BIGGER : MINOR));
};

function PlanetsList() {
  const {
    isLoading,
    setIsLoading,
    data,
    setData,
    filters,
    order,
  } = useContext(YodaContext);
  let planets = [];

  useEffect(() => {
    GetPlanets().then((results) => {
      results.results.forEach((planet) => (delete planet.residents));
      setData(results);
      setIsLoading(false);
    });
    return setIsLoading(true);
  }, [setData, setIsLoading]);

  const { filterByNumericValues } = filters.filterByNumericValues !== null
    ? filters : null;
  if (filterByNumericValues && filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((filter, index) => {
      const { column, comparison, value } = filter;
      planets = index === 0
        ? getFilteredPlanets(comparison, column, value, data.results)
        : getFilteredPlanets(comparison, column, value, planets);
    });
  }

  if (data && filterByNumericValues.length === 0) { planets = data.results; }

  if (filters && filters.filterByName && data) {
    planets = [];
    planets = filters.filterByName.name === ''
      ? data.results
      : data.results.filter(
        (planet) => (
          planet.name).toUpperCase().includes(filters.filterByName.name.toUpperCase()),
      );
  }

  planets = sortPlanets(planets, order);

  return (
    <div>
      { isLoading
        ? <span>Loading...</span>
        : (
          <main>
            <div className="navbar-search">
              <MainNavBar />
            </div>
            { planets.length === 0
              ? (
                <span>
                  No results for your the search.
                  Try clicking in
                  <strong> Star Wars Planets Inventory above </strong>
                  or redefine your search arguments.
                </span>
              )
              : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      { generateHeader(Object.keys(planets[0])) }
                    </tr>
                  </thead>
                  <tbody>
                    { generateRows(planets) }
                  </tbody>
                </Table>
              )}
          </main>
        ) }
    </div>
  );
}
export default PlanetsList;
