import React, { Component } from 'react';

import Filter from '../components/Filter';
import Table from '../components/Table';
import context from '../context/contextApi';
import requestPlanets from '../services/serviceApi';

class Home extends Component {
  componentDidMount() {
    const { setPlanets } = this.context;
    requestPlanets().then((response) => setPlanets(response.results));
  }

  render() {
    return (
      <div>
        <Filter />
        <Table />
      </div>
    );
  }
}

Home.contextType = context;

export default Home;
