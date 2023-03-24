import './App.css';
import React from 'react';
import './index.css';
import Start from './comp/Start'
import MainPage from './comp/MainPage'
import Mywishlist from './comp/Mywishlist'
import Cart from './comp/Cart'
import { CartProvider } from './comp/ContextProvider'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<MainPage />} errorElement={<p br>Oops!<br />
              Sorry, an unexpected error has occurred.<br />
              Not Found
            </p>} />
            <Route path="/Start" element={<Start />} />
            <Route path="/Mywishlist" element={<Mywishlist />} />
            <Route path="/Cart"  element={<Cart/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  )
}
export default App