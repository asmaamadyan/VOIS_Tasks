import { useRef } from "react";
import Cart from "./Cart";

function CartModal({actions ,ref}) {

    return ( 
        <dialog id ="modal" ref={ref}>
            <h2>Cart</h2>
            <Cart />
            <form method="dialog" id ='modal-actions'>
                {actions}
            </form>
        </dialog>
    );
}

export default CartModal;