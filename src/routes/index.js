import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import Home from '../pages/Home/index';
import Planets from '../pages/Planets/index';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Planets } />
        {/* <Route path="/planets" exact component={ Planets } /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
