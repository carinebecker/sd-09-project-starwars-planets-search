import { createContext } from 'react';

export const initialState = {
  filters:
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: '',
          comparison: '',
          value: '',
        },
      ],
    },
};

const AppContext = createContext();

export default AppContext;
