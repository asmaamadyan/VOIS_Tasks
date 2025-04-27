import { createContext, useReducer } from "react";
import mealsData from "../data/meals.json";

export const CartContext= createContext({
    items :[],
    addItemToCart :()=>{},
    updateItemQuantity :()=>{} ,
    removeItemFromCart :()=>{},
})

function cartReducer(state , action){
    if (action.type === 'ADD_ITEM') {

        const updatedItems = [...state.items];
  
        const existingCartItemIndex = updatedItems.findIndex(
          (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
  
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            quantity: existingCartItem.quantity + 1,
          };
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          const product = mealsData.find((product) => product.id === action.payload);
          updatedItems.push({
            id: action.payload,
            name: product.name,
            price: product.price,
            quantity: 1,
          });
        }
  
        return {
          items: updatedItems,
        };
      }
      if (action.type ==='UPDATE_QUANTITY'){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.productId
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
  
        updatedItem.quantity += action.payload.amount; 
  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }
  
        return {
            ...state , 
          items: updatedItems,
        };
      }
            // if (action.type ==='REMOVE_ITEM'){
            //     return {
            //         ...state,
            //         items: state.items.filter(item => item.id !== action.payload.id)
            //     };
            // }
            return state;
    
        }

export default function CartContextProvider({children}){

    const [cartState , cartDispatch] =useReducer(cartReducer ,{items :[]})


    function handleAddToCart(id){
        cartDispatch({
            type: 'ADD_ITEM',
            payload:id
        })
    }
    function handleUpdateItemQuantity(productId , amount){
        cartDispatch({
            type: 'UPDATE_QUANTITY',
            payload:{
                productId :productId,
                amount :amount
            }
        })
    }
    function handleRemoveItemFromCart(productId){
        cartDispatch({
            type: 'REMOVE_ITEM',
            payload:{
                productId :productId
            }
        })
    }
    const ctxValue ={
        items : cartState.items,
        addItemToCart :handleAddToCart,
        updateItemQuantity :handleUpdateItemQuantity,
        removeItemFromCart :handleRemoveItemFromCart
    }
    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}