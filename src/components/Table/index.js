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
      {Object.keys(data.results[0]).map((title) => <th key={ title }>{title}</th>)}
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
      }, []))
    .map((element) => (
      <tr key={ element.name }>
        { Object.values(element).map((value) => <td key={ value }>{ value }</td>) }
      </tr>
    ));

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
