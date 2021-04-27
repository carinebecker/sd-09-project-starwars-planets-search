import React, { Component } from 'react';

import Table from '../Components/Table';
import context from '../context/contextApi';
import requestPlanets from '../services/servicesApi';

class Home extends Component {
  componentDidMount() {
    const { setPlanets } = this.context;
    requestPlanets().then((response) => setPlanets(response.results));
  }

  render() {
    return (
      <div>
        <Table />
      </div>
    );
  }
}

Home.contextType = context;

export default Home;
