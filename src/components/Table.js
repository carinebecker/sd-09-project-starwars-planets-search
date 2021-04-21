import React, { useContext } from 'react';
import { PlanetSearchContext } from '../context';
import Loading from './Loading';
import useFilters from '../hooks';

const renderInnerLines = (lineValue, index) => (
  <p key={ `line-${index}` }>
    { lineValue }
  </p>
);

const renderRow = (rowData) => {
  delete rowData.residents;
  const rowEntries = Object.entries(rowData);
  return (
    <tr key={ rowData.name }>
      { rowEntries.map(([cellName, cellValue]) => {
        const haveMultipleLines = cellName === 'films';
        return (
          <td key={ cellName }>
            {
              haveMultipleLines
                ? cellValue.map(renderInnerLines)
                : cellValue
            }
          </td>
        );
      })}
    </tr>
  );
};

const renderTableFor = (data) => {
  const columnsNames = [
    'Name',
    'Rotation period',
    'Orbital period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Water on surface',
    'Population',
    'Films',
    'Created',
    'Edited',
    'Url',
  ];
  return (
    <table>
      <thead>
        <tr>
          { columnsNames.map((name) => <th key={ name }>{ name }</th>) }
        </tr>
      </thead>
      <tbody>
        { data.map(renderRow) }
      </tbody>
    </table>
  );
};

const Table = () => {
  const { isFetchingPlanets } = useContext(PlanetSearchContext);
  const [data] = useFilters();

  if (isFetchingPlanets) return (<Loading />);
  return (
    <div>
      { renderTableFor(data) }
    </div>
  );
};

export default Table;
