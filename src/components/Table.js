import React from 'react';
import TableContext from '../context/TableContext';
import './Table.css';

// function Table() {
//   const { isFetching, planets, fetchPlanets } = useContext(TableContext);

//   useEffect(() => { fetchPlanets(); }, []);

//   return (
//     isFetching ? (<h1>CARREGANDO...</h1>)
//       : (
//         <table>
//           <thead>
//             <tr>
//               {Object.keys(planets[0]).map((header) => <th key={ header }>{header}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {planets.map((planet) => (
//               <tr key={ planet.name }>
//                 {Object.values(planet).map((value) => (
//                   <td key={ value }>
//                     {value}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )
//   );
// }

class Table extends React.Component {
  async componentDidMount() {
    const { fetchPlanets } = this.context;
    fetchPlanets();
  }

  render() {
    const { isFetching, planets } = this.context;
    return (
      isFetching ? (<h1>CARREGANDO...</h1>)
        : (
          <table>
            <thead>
              <tr>
                {Object.keys(planets[0])
                  .map((header) => <th key={ header }>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {planets.map((planet) => (
                <tr key={ planet.name }>
                  {Object.values(planet).map((value) => (
                    <td key={ value }>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
    );
  }
}

Table.contextType = TableContext;

export default Table;
