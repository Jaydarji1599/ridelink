import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import Login from '../pages/Landing';
import Home from '../pages/Home';

const Main = () => {
  return (
    <Routes>
      <Route exact path='/login' element={<Login />}></Route>
      <Route exact path='/' element={<PrivateRoute />}>
        <Route exact path='/' element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Main;