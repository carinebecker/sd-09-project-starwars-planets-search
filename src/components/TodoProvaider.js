// import React, { useState, useEffect } from 'react';
// import TodoContext from './TodoContext';

// function TodoProvider({ children }) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const value = { data, loading }

//   useEffect(()=> {
//     fetch("https://swapi-trybe.herokuapp.com/api/planets/")
//     .then(result => result.json())
//     .then(json => {
//       setData(json.results)
//       setLoading(true)
//     })
//   },[setData])

//   return (
//     <TodoContext.Provider value={value}>
//       {children}
//     </TodoContext.Provider>
//   );
// }
// export default TodoProvider;
