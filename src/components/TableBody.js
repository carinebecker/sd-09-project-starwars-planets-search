import React, { useContext } from 'react';
import context from '../context/context';

function TableBody() {
  const { data } = useContext(context);

  const createTableBody = () => (
    data.map((planet, index) => (
      <tr key={ planet.name } className={ `row${index}` }>
        <td className="col1" data-testid="planet-name">{ planet.name }</td>
        <td className="col2">{ planet.rotation_period }</td>
        <td className="col3">{ planet.orbital_period }</td>
        <td className="col4">{ planet.diameter }</td>
        <td className="col5">{ planet.climate }</td>
        <td className="col6">{ planet.gravity }</td>
        <td className="col7">{ planet.terrain }</td>
        <td className="col8">{ planet.surface_water }</td>
        <td className="col9">{ planet.population }</td>
        <td className="col10">{ planet.films }</td>
        <td className="col11">{ planet.created }</td>
        <td className="col12">{ planet.edited }</td>
        <td className="col13">{ planet.url }</td>
      </tr>
    ))
  );

  return (
    <tbody className="tableBody">
      { createTableBody() }
    </tbody>
  );
}

export default TableBody;
