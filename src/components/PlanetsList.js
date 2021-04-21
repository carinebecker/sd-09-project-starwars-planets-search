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

const PlanetsList = () => {
  const { isLoading, setIsLoading, data, setData } = useContext(YodaContext);
  useEffect(() => {
    GetPlanets().then((results) => {
      results.results.forEach((planet) => (delete planet.residents));
      setData(results);
      setIsLoading(false);
    });
    return setIsLoading(true);
  }, [setData, setIsLoading]);
  const planets = (isLoading) ? '' : data.results;
  return (
    <div>
      { isLoading || !data
        ? <span>Loading...</span>
        : (
          <main>
            <div className="navbar-search">
              <MainNavBar />
            </div>
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
          </main>
        ) }
    </div>
  );
};
export default PlanetsList;
