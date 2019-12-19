import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import ShoppingList from "./components/ShoppingList";
import NavBar from "./components/NavBar";
import url from "./components/url";

ReactDOM.render(
  <BrowserRouter>
    <NavBar />
    <div>
      <Route exact path="/" component={ShoppingList} />
      <Route exact path="/url" component={url} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
