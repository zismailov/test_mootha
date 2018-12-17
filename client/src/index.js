import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Movies from "./movies/Movies";
import Movie from "./movies/Movie";
import Person from "./persons/Person";
// Import routing components
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Movies} />
      <Route exact path="/movies/:id" component={Movie} />
      <Route exact path="/persons/:id" component={Person} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
