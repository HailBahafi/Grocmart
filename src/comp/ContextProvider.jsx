// import React, { useState, createContext, useEffect } from 'react'
// const ThemeContext = createContext()
// export function CartProvider({ children }) {
//   const [IsDarkMode, SetIsDarkMode] = useState(true)
//   const [cart, setCart] = useState([])
//   JSON.parse(localStorage.getItem("darkMode"))
//   useEffect(() => {
//     document.body.style.backgroundColor = IsDarkMode? 'rgb(42, 41, 41)':'white';
//   }, [IsDarkMode]);
//   useEffect(() => {
//     let cart = JSON.parse(localStorage.getItem('cart') || '[]')
//     setCart(cart)
//   }, []);
//   return (
//     <ThemeContext.Provider value={{ IsDarkMode,SetIsDarkMode , cart , setCart }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }
// export default ThemeContext



import React, { useState, createContext, useEffect } from 'react';
const ThemeContext = createContext();

export function CartProvider({ children }) {
  const [IsDarkMode, SetIsDarkMode] = useState(true);
  const [cart, setCart] = useState([]);

  JSON.parse(localStorage.getItem("darkMode"));

  useEffect(() => {
    document.body.style.backgroundColor = IsDarkMode ? 'rgb(42, 41, 41)' : 'white';
  }, [IsDarkMode]);

  useEffect(() => {
    let storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <ThemeContext.Provider value={{ IsDarkMode, SetIsDarkMode, cart, setCart, updateCart }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
