import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
       {/*<Route path="/login" component={Login} /> */}
        <Route path="/products" component={ProductList} exact />
        <Route path="/products/:id" component={ProductDetail} />
        {/* TODO: Add more routes as necessary */}
      </Switch>
    </Router>
  );
};

export default App;
