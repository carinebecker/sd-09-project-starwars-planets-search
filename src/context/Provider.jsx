import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import { fetchPlanets } from '../services/SWAPI';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: undefined,
    };
    this.getData = this.getData.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  async getData() {
    const { data } = this.state;
    if (data) return;
    this.setState({ loading: true });
    const dataFetched = await fetchPlanets();
    this.setState({ data: dataFetched, loading: false });
  }

  renderTable({ results }) {
    const residentsIndex = 9;
    return (
      <table>
        <thead>
          <tr>
            {Object.keys(results[0]).map((head, headIndex) => (
              head !== 'residents' && <th key={ headIndex }>{head}</th>))}
          </tr>
        </thead>
        <tbody>
          {results.map((planet, index) => (
            <tr key={ index }>
              {Object.values(planet).map((value, rowIndex) => (
                rowIndex !== residentsIndex && <td key={ rowIndex }>{value}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const context = {
      ...this.state,
      getData: this.getData,
      renderTable: this.renderTable,
    };

    const { children } = this.props;
    return (
      <SWContext.Provider value={ context }>
        {children}
      </SWContext.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
