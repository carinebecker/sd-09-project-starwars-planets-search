import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

const Table = () => {
  const {
    fetchingData,
    planetsData,
    getPlanetsData,
  } = useContext(AppContext);

  useEffect(() => {
    getPlanetsData();
  }, [getPlanetsData]);

  const renderTableHeader = (planetsArray) => {
    const [modelSchema] = planetsArray;
    const objKeys = Object.keys(modelSchema);
    objKeys.pop();
    const tHeader = objKeys.map((item) => <th key={ item }>{item}</th>);
    return tHeader;
  };

  const renderTableDataRow = (planetData, paiIndex) => {
    const values = Object.values(planetData);
    values.pop();
    const cells = values.map((item, index) => (
      <td key={ `${paiIndex}${item}cell${index}` }>{item}</td>));
    return cells;
  };

  const renderTableRows = (planetsArray) => {
    const tableRow = planetsArray.map((planet, index) => (
      <tr key={ `${planet.name}row` }>
        {renderTableDataRow(planet, index)}
      </tr>
    ));
    return tableRow;
  };

  if (fetchingData) {
    return <span>Loading</span>;
  }
  return (
    <table>
      <thead>
        <tr>
          {renderTableHeader(planetsData)}
        </tr>
      </thead>
      <tbody>
        {renderTableRows(planetsData)}
      </tbody>
    </table>
  );
};

export default Table;
