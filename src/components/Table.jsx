import React, { useEffect, useState } from 'react';
import requestApi from '../services/requestApi';

const Table = () => {
  const [planets, setPlanets] = useState([{}]);

  useEffect(() => {
    async function getPlanets() {
      const planetsArray = await requestApi();
      setPlanets(planetsArray);
    }

    getPlanets();
  }, []);

  const renderTableHeader = (planetsData) => {
    const [modelSchema] = planetsData;
    const objKeys = Object.keys(modelSchema);
    objKeys.pop();
    const tHeader = objKeys.map((item) => <th key={ item }>{item}</th>);
    return tHeader;
  };

  const renderTableDataRow = (planetData) => {
    const values = Object.values(planetData);
    values.pop();
    const cells = values.map((item) => <td key={ `${item}cell` }>{item}</td>);
    return cells;
  };

  const renderTableRows = (planetsData) => {
    const tableRow = planetsData.map((planet) => (
      <tr key={ `${planet.name}row` }>
        {renderTableDataRow(planet)}
      </tr>
    ));
    return tableRow;
  };

  return (
    <table>
      <thead>
        <tr>
          {renderTableHeader(planets)}
        </tr>
      </thead>
      <tbody>
        {renderTableRows(planets)}
      </tbody>
    </table>
  );
};

export default Table;
