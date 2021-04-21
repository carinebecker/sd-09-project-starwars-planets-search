import React, { useContext } from 'react';
import starsWContext from '../../context/starsWContext';

export default function Table() {
  const {
    data,
    filters: {
      filterByName: { name = '' },
      filterByNumericValues,
    },
  } = useContext(starsWContext);
  const filerByNumLength = filterByNumericValues.length - 1;

  const rowHead = () => (
    <tr>
      <th>Name</th>
      <th>Roatação</th>
      <th>Período Orbital</th>
      <th>Diâmetro</th>
      <th>Clima</th>
      <th>Gravidade</th>
      <th>Terrain</th>
      <th>água na superfície</th>
      <th>população</th>
      <th>Films</th>
      <th>Editado</th>
      <th>Criado</th>
      <th>Url</th>
    </tr>
  );
  const comparisonCondition = (crr) => {
    let comparison;
    switch (filterByNumericValues.length
      && filterByNumericValues[filerByNumLength].comparison) {
    case 'maior que':
      comparison = Number(crr[filterByNumericValues[filerByNumLength].colum])
                    > Number(filterByNumericValues[filerByNumLength].value);
      break;
    case 'menor que':
      comparison = Number(crr[filterByNumericValues[filerByNumLength].colum])
                    < Number(filterByNumericValues[filerByNumLength].value);
      break;
    default:
      comparison = Number(crr[filterByNumericValues[filerByNumLength].colum])
                    === Number(filterByNumericValues[filerByNumLength].value);
      break;
    }
    return comparison;
  };

  const rowBody = () => (
    data.results
      .reduce((arr, crr) => {
        if (crr.name.includes(name)
        || (filterByNumericValues.length
              && comparisonCondition(crr))) {
          arr.push(crr);
        }
        return arr;
      }, []).map((element) => (
        <tr key={ element.name }>
          <td>{element.name}</td>
          <td>{element.rotation_period}</td>
          <td>{element.orbital_period}</td>
          <td>{element.diameter}</td>
          <td>{element.climate}</td>
          <td>{element.gravity}</td>
          <td>{element.terrain}</td>
          <td>{element.surface_water}</td>
          <td>{element.population}</td>
          <td>{element.films}</td>
          <td>{element.edited}</td>
          <td>{element.created}</td>
          <td>{element.url}</td>
        </tr>
      )));

  if (!data.results) return <p>Loading...</p>;
  return (
    <div>
      <table>
        <thead>
          { rowHead() }
        </thead>
        <tbody>
          { rowBody() }
        </tbody>
      </table>
    </div>
  );
}
