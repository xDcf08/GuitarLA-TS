import { db } from "../data/db";
import { useEffect, useState } from "react";
import { TCartItem, TGuitar } from "../types";

export const useCart = () => {
  const initialCart = () : TCartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : []; 
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  const addToCart = (items : TGuitar) => {

    const itemExists = cart.findIndex( guitar => guitar.id === items.id);
    if (itemExists !== -1) {
      const newCart = [...cart];
      newCart[itemExists].quantity++;
      setCart(newCart);
    }else{
      const newItem : TCartItem = {...items, quantity:1}
      setCart([...cart, newItem])
    }

  }

  const removeFromCart = (items : Pick<TGuitar, 'id'>) => {
    const newCart = cart.filter(guitar => guitar.id !== items.id);
    setCart(newCart);
  }

  const increaseQuantity = (items : Pick<TGuitar, 'id'>) => {
    const newCart = [...cart];
    const itemExists = newCart.findIndex(guitar => guitar.id === items.id);
    newCart[itemExists].quantity++;
    setCart(newCart);
  }

  const decreaseQuantity = (items : Pick<TGuitar, 'id'>) => {
    const newCart = [...cart];
    const itemExists = newCart.findIndex(guitar => guitar.id === items.id);
    newCart[itemExists].quantity--;

    if(newCart[itemExists].quantity === 0){
      removeFromCart(items);
      return;
    }
    setCart(newCart);
  }

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setCart
  }
}