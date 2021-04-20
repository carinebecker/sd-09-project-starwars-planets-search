import React, { createContext } from 'react';
import PropTypes from 'prop-types';

function ContextTable(props) {
  const ContextAPIData = createContext();
  const contextValue = { data: 'test' };

  const { children } = props;
  return (
    <ContextAPIData.Provider value={ contextValue }>
      {children}
    </ContextAPIData.Provider>
  );
}

export default ContextTable;

ContextTable.propTypes = {
  children: PropTypes.func.isRequired,
};
