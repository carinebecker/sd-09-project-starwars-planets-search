import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();
const { Provider } = UserContext;

function UserProvider({ children }) {
  const [filter, setFilter] = useState(null);
  const context = {
    filter,
    setFilter,
  };
  return <Provider value={ { ...context } }>{children}</Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
