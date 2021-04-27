import React, { Component } from 'react';
import Table from '../components/Table';
import context from '../context/contextApi';
import requestAPI from '../services/requestAPI';

class Home extends Component {
  componentDidMount() {
    const { setPlanets } = this.context;
    requestAPI().then((response) => setPlanets(response.results));
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
