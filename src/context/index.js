import React, { createContext, useState } from 'react';

const AppContext = createContext('');

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({});
  const [filterData, setFilterData] = useState([]);

  const filtering = () => {
    const newData = data.filter((element) => element.name.includes(
      filter.filters.filtersByName.name,
    ));
    setFilterData(newData);
  };

  const context = {
    data,
    filter,
    filterData,
    setData,
    setFilter,
    setFilterData,
    filtering,
  };

  return (<AppContext.Provider value={ context }>{children}</AppContext.Provider>);
};

export { AppContext, AppProvider };
