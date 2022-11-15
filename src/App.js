import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './component/auth/Login';
import Category from './component/category/Category';
import Header from './component/header/Header';
import Cart from './component/Cart/Cart';
import ProductCatalouge from './component/ProductCatalogue/ProductCatalouge';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CheckoutPage from './component/Checkout/CheckoutPage';
import RetailerAddProduct from './component/retailer/RetailerAddProduct';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/cart" element={<Cart />}/>
          <Route exact path="/productCatalouge" element={<ProductCatalogue />}/>
          <Route exact path="/product/:id" element={<ProductDetails />}/>
          <Route exact path="/checkout" element={<CheckoutPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;