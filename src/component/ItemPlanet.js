import React from 'react';
import PropTypes from 'prop-types';
import './ItemPlanet.css';

function ItemPlanet({ name, rotation, orbital, diameter, climate, gravity, terrain,
  surface, population, films, created, edited, url }) {
  return (
    <tr>
      <td className="field-name">{ name }</td>
      <td className="field-rotation">{ rotation }</td>
      <td className="field-orbital">{ orbital }</td>
      <td className="field-diameter">{ diameter }</td>
      <td className="field-climate">{ climate }</td>
      <td className="field-gravity">{ gravity }</td>
      <td className="field-terrain">{ terrain }</td>
      <td className="field-surface">{ surface }</td>
      <td className="field-population">{ population }</td>
      <td className="field-films">{ films }</td>
      <td className="field-created">{ created }</td>
      <td className="field-edited">{ edited }</td>
      <td className="field-url">{ url }</td>
    </tr>
  );
}

ItemPlanet.propTypes = ({
  name: PropTypes.string,
  rotation: PropTypes.string,
  orbital: PropTypes.string,
  diameter: PropTypes.string,
  climate: PropTypes.string,
  gravity: PropTypes.string,
  terrain: PropTypes.string,
  surface: PropTypes.string,
  population: PropTypes.string,
  films: PropTypes.string,
  created: PropTypes.string,
  edited: PropTypes.string,
  url: PropTypes.string,
}).isRequired;

export default ItemPlanet;
