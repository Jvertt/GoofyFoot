import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/products" component={ProductList} exact />
        {/* TODO: Add more routes as necessary */}
      </Switch>
    </Router>
  );
}

export default App;
