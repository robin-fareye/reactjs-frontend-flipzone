import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Login from './component/auth/Login';
import Category from './component/category/Category';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Cart from './component/Cart/Cart';
import ProductCatalouge from './component/ProductCatalogue/ProductCatalouge';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CheckoutPage from './component/Checkout/CheckoutPage';
import RetailerAddProduct from './component/retailer/RetailerAddProduct';


function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/productCatalouge">
          <ProductCatalogue />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/checkout">
          <CheckoutPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;