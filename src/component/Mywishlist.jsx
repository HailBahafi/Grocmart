import React, { useEffect, useState, useContext } from 'react';
import { RiDeleteBinLine, RiDragMove2Fill } from 'react-icons/ri';
import { GiBasket } from "react-icons/gi"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableRow from './DraggableRow '
import 'rsuite/dist/rsuite.css'; //input css
import Header from './Header'
import ThemeContext from './ContextProvider'
function Mywishlist() {
  const [CheckboxItems, SetCheckboxItems] = useState([])
  const [wishlistItems, setWishlistItems] = useState([]);
  const { IsDarkMode, SetIsDarkMode, updateCart } = useContext(ThemeContext);
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || '[]')
    setWishlistItems(wishlist)
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  function deleteitem(id) {
    const newarr = wishlistItems.filter((item) => item.id !== id)
    localStorage.setItem('wishlist', JSON.stringify(newarr))
    setWishlistItems(newarr)
  }
  const HandleSelectedCheckbox = (e) => {
    if (e.target.checked) {
      let value = parseInt(e.target.value)
      let checkedList = [...CheckboxItems, value]
      SetCheckboxItems(checkedList)
    } else {
      let value = parseInt(e.target.value)
      let checkedList = [...CheckboxItems]
      checkedList.splice(CheckboxItems.indexOf(value), 1)
      SetCheckboxItems(checkedList) // Update the state with the new checkedList
    }

  }
  const DeleteSelectedCheckbox = () => {
    if (!CheckboxItems.length)
      return;

    const newlist = wishlistItems.filter((item) => !CheckboxItems.includes(item.id))
    localStorage.setItem('wishlist', JSON.stringify(newlist))
    setWishlistItems(newlist)
  }
  const HandleMoveToCart = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || '[]');

    if (id) {
      // Move single item to cart
      const itemIndex = wishlist.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
        const item = wishlist[itemIndex];
        wishlist.splice(itemIndex, 1);
        const found = cart.some(val => val.id === item.id);
        if (!found) {
          cart.push({ ...item, quantity: item.quantity || 1 });
          updateCart(cart);
        }
        setWishlistItems(wishlist);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
    } else {
      // Move all selected items to cart
      CheckboxItems.forEach(itemID => {
        const itemIndex = wishlist.findIndex(item => item.id === itemID);
        if (itemIndex !== -1) {
          const item = wishlist[itemIndex];
          wishlist.splice(itemIndex, 1);
          const found = cart.some(val => val.id === item.id);
          if (!found) {
            cart.push({ ...item, quantity: item.quantity || 1 });
          }
        }
      });

      updateCart(cart); // Update the cart state
      setWishlistItems(wishlist);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      SetCheckboxItems([]); // Clear the selected items
    }
  };



  const handledarkmode = () => {
    SetIsDarkMode(!IsDarkMode)
    localStorage.setItem('darkMode', !IsDarkMode)
  }

  const handleMoveRow = (dragIndex, hoverIndex) => {
    const newWishlistItems = [...wishlistItems];
    const itemToMove = newWishlistItems.splice(dragIndex, 1)[0];
    newWishlistItems.splice(hoverIndex, 0, itemToMove);
    setWishlistItems(newWishlistItems);
  };

  const handleQuantityChange = (id, quantity) => {
    const newWishlistItems = wishlistItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setWishlistItems(newWishlistItems);
    localStorage.setItem("wishlist", JSON.stringify(newWishlistItems));
  };
  return (
    <>
      <div className={`${IsDarkMode ? "dark_mode" : ""} `}>
        <Header IsDarkMode={IsDarkMode} handledarkmode={handledarkmode} />
        <DndProvider backend={HTML5Backend}>
          <div className='flex items-center justify-center pb-16 pt-4'>
            <span alt="" className={`${IsDarkMode ? "text-white" : " text-black"} pr-3`}>< GiBasket size={32} /></span>
            <h1 className=' font-sans text-3xl font-bold pr-4 '>My wishlist</h1>
          </div>
          <table className='table-auto mx-20'>
            <thead>
              <tr className='font-sans text-xl font-bold border-b-2 border-green-500/50'>
                <th className='w-1/5 px-2 py-4 '><h1 className=' text-xl'>Product Name</h1> </th>
                <th className='w-1/4 px-4 py-4'>Unit Price</th>
                <th className='w-1/6 px-2 py-4'>Quantity</th>
                <th className='w-1/5 px-3 py-4'></th>
                <th className='w-1/7 px-6 py-4'>Remove</th>
                <th className='w-1/7 px-7 py-4'>Arrange</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item, index) => (
                <DraggableRow
                  key={item.id}
                  item={item}
                  index={index}
                  quantity={item.quantity ? item.quantity : 1}
                  handleCheckbox={HandleSelectedCheckbox}
                  handleDelete={deleteitem}
                  handleMoveToCart={HandleMoveToCart}
                  onQuantityChange={handleQuantityChange}
                  handleMoveRow={handleMoveRow}
                  onAddToCartClick={() => HandleMoveToCart(item.id)}
                  checkboxState={CheckboxItems.includes(item.id) || false}
                />

              ))}

              {wishlistItems.map(item =>
                <tr key={item.id} className='border-b border-gray-400 font-serif  text-md'>
                </tr>)}

            </tbody>
          </table>
        </DndProvider>
        <div className='p-14 flex justify-end items-center'>
          <button className=' text-lg bg-transparent bg-gray-100 hover:bg-green-700 text-black-700 font-semibold hover:text-white
                              h-16 w-36 border border-green-500 hover:border-transparent rounded-lg' onClick={() => HandleMoveToCart()}>Add to cart</button>
          <button className='m-6' onClick={() => DeleteSelectedCheckbox()}><span><RiDeleteBinLine size={34} /></span></button>
        </div>
      </div>
    </>
  )
}
export default Mywishlist