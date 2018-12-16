import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Movies from "./movies/Movies";
import Movie from "./movies/Movie";
// Import routing components
import { BrowserRouter, Link, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Movies} />
      <Route exact path="/movies/:id" component={Movie} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
