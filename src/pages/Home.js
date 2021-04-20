import React from 'react';
import Filter from '../components/Filter';
import Table from '../components/Table';
import myContext from '../context/contextAPI';
import requestPlanets from '../serviceAPI';

class Home extends React.Component {
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

Home.contextType = myContext;

export default Home;
