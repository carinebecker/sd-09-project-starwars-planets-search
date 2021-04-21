import React, { useContext } from 'react';
import { Context } from '../Context';

function Table() {
  const { data, filters } = useContext(Context);
  const { filterByName } = filters;
  if (!data.results) return <table />;

  return (
    <table>
      <thead>
        <tr>
          { Object.keys(data.results[0])
            .map((element) => <th key={ element }>{ element }</th>) }
        </tr>
      </thead>
      <tbody>
        { data.results
          .filter(({ name }) => name.toLowerCase().includes(filterByName.name))
          .map((element) => (
            <tr key={ element.name }>
              { Object.values(element).map((value) => <td key={ value }>{ value }</td>) }
            </tr>
          )) }
      </tbody>
    </table>
  );
}

export default Table;
