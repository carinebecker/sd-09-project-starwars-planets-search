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
    <tr key={ gen.next().value }>{ generateRowData(Object.values(planet)) }</tr>
  ));
  return rows;
};

const getFilteredPlanets = (comparison, column, value, data) => {
  let planets = [];
  switch (comparison) {
  case 'maior que':
    planets = data.results.filter(
      (planet) => (parseInt(planet[column], 10) > parseInt(value, 10)),
    );
    console.log(planets);
    return planets;
  case 'menor que':
    planets = data.results.filter(
      (planet) => (parseInt(planet[column], 10) < parseInt(value, 10)),
    );
    return planets;
  default:
    planets = data.results.filter(
      (planet) => (parseInt(planet[column], 10) === parseInt(value, 10)),
    );
    return planets;
  }
};

function PlanetsList() {
  const {
    isLoading,
    setIsLoading,
    data,
    setData,
    filters,
    filteredPlanets,
    setFilteredPlanets,
  } = useContext(YodaContext);

  let planets = filteredPlanets;
  useEffect(() => {
    GetPlanets().then((results) => {
      results.results.forEach((planet) => (delete planet.residents));
      setData(results);
      setFilteredPlanets(results.results);
      setIsLoading(false);
    });
    return setIsLoading(true);
  }, [setData, setIsLoading, setFilteredPlanets]);

  const customizedFiltersSearch = () => {
    const filterByNumericValues = filters.filterByNumericValues
      ? filters.filterByNumericValues : null;
    if (filterByNumericValues) {
      const { column, comparison, value } = filterByNumericValues;
      planets = getFilteredPlanets(comparison, column, value, data);
      setFilteredPlanets(planets);
    }
  };

  if (filters && filters.filterByName && data) {
    planets = [];
    planets = filters.filterByName.name === ''
      ? data.results
      : data.results.filter(
        (planet) => planet.name.includes(filters.filterByName.name),
      );
  }
  console.log(planets);
  return (
    <div>
      { isLoading
        ? <span>Loading...</span>
        : (
          <main>
            <div className="navbar-search">
              <MainNavBar
                customizedFiltersSearch={ customizedFiltersSearch }
              />
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
};
export default PlanetsList;
