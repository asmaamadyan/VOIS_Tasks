import { useContext } from "react";
import { CartContext } from "../store/cart-context";

function Cart() {
    const {items , updateItemQuantity, removeItemFromCart} = useContext(CartContext);

    return ( 
        <div id='cart'>
            {items.length === 0 && <p>Your cart is empty</p>}
            {items.length > 0 &&
        <ul id="cart-items">

            {items.map((item)=>(
                <li key={item.id}><span>{item.name}</span>
                <span>${item.price}</span>
                </li>
                
            ))}
        </ul>
        }
        </div>
    );
}

export default Cart;