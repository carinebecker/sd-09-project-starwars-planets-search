import React from 'react';
import TableContext from '../context/TableContext';
import numericFilter from '../services/numericFilter';
import './Table.css';

class Table extends React.Component {
  constructor() {
    super();
    this.renderPlanetsInfo = this.renderPlanetsInfo.bind(this);
  }

  async componentDidMount() {
    const { fetchPlanets } = this.context;
    fetchPlanets();
  }

  renderPlanetsInfo() {
    const { planets, filters: { filterByName: { name },
      filterByNumericValues } } = this.context;
    const controlIndex = -1;
    let filteredPlanets = [...planets];
    if (name) {
      filteredPlanets = planets.filter((planet) => planet.name
        .toLowerCase().indexOf(name.toLowerCase()) > controlIndex);
    }
    if (filterByNumericValues.length > 0) {
      filteredPlanets = numericFilter(filteredPlanets, filterByNumericValues[0]);
    }
    return filteredPlanets.map((planet) => (
      <tr key={ planet.name }>
        {Object.values(planet).map((value) => (
          <td key={ value }>
            {value}
          </td>
        ))}
      </tr>
    ));
  }

  render() {
    const { isFetching, planets } = this.context;
    return (
      isFetching ? (<h1>CARREGANDO...</h1>)
        : (
          <table>
            <thead>
              <tr>
                {Object.keys(planets[0])
                  .map((header) => <th key={ header }>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              { this.renderPlanetsInfo() }
            </tbody>
          </table>
        )
    );
  }
}

Table.contextType = TableContext;

export default Table;
