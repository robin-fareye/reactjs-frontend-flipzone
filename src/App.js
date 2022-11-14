// import React from 'react';
import './App.css';
import Login from './component/auth/Login';
import Category from './component/category/Category';
import Header from './component/header/Header';
//import Home from './component/home/Home';

function App() {
  return (
    <div>
      <Header/>
      <Category/>
      <Login/>
    </div>
  );
}

export default App;
