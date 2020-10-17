import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Map from "./pages/Map";
import Asilo from "./pages/Asilo";
import CreateAsilo from "./pages/CreateAsilo";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/map" component={Map} />
        <Route path="/asilos/create" component={CreateAsilo} />
        <Route path="/asilos/:id" component={Asilo} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
