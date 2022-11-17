/* eslint-disable */
import React from 'react';
import { BrowserRouter, Routes,  Route } from 'react-router-dom';
import './App.css';

import Login from './component/auth/Login';
import Category from './component/category/Category';
import Header from './component/header/Header';
import Cart from './component/Cart/Cart';
import ProductCatalouge from './component/ProductCatalogue/ProductCatalouge';
import ProductDetails from './component/ProductDetails/ProductDetails';
import CheckoutPage from './component/Checkout/CheckoutPage';
import RetailerAddProduct from './component/retailer/RetailerAddProduct';
import RetailerProductListing from './component/retailer/RetailerProductListing';
import HomePage from './component/HomePage/HomePage';
import ProductPage from './component/ProductPage/ProductPage';
import MyOrders from './component/MyOrders/MyOrders';


function App() {
  return (
    // <div >
    //   <Router>
    //     <Routes>
    //       <Route exact path="/" element={<ProductCatalouge />}/>
    //       <Route exact path="/login" element={<Login />}/>
    //       <Route exact path="/cart" element={<Cart />}/>
    //       <Route exact path="/productCatalouge" element={<ProductCatalouge />}/>
    //       <Route exact path="/product/:id" element={<ProductDetails />}/>
    //       <Route exact path="/checkout" element={<CheckoutPage />}/>
    //     </Routes>
    //   </Router>
    //   <Cart/>
    // </div>
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/homePage" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/orders" element={<MyOrders />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />}/>
          <Route exact path="/retailer" element={<RetailerProductListing />}/>
          <Route exact path="/addProduct" element={<RetailerAddProduct />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;