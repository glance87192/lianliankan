import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from './pages/login/login'
import Gamelist from './pages/gamelist/gamelist'
import Home from './pages/home/home'
import Linkgame from './pages/linkgame/linkgame'
import Users from './pages/users/users'

export default function app() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Gamelist />}>
          <Route path='home' element={<Home />} />
          <Route path='linkgame' element={<Linkgame />} />
          <Route path='snake' />
          <Route path='poke' />
          <Route path='users-manage' element={<Users />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  )
}