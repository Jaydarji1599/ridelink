import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />}></Route>
      <Route exact path='/home' element={<Home />}></Route>
    </Routes>
  );
}

export default Main;