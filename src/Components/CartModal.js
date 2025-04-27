import { useContext, useState } from "react";
import Cart from "./Cart";
import { CartContext } from "../store/cart-context";
import SubmitForm from "./SubmitForm";

function CartModal({ actions, ref, checkout ,close }) {
  const { items ,clearCart } = useContext(CartContext);
  const [submitted,setSubmitted] = useState(false)

  function handleCheckout(event) {
    event.preventDefault();
    console.log('checkout',checkout);
  }
function submitHandler(){
  clearCart();
  setSubmitted(true)
}

  return (
    <dialog id="modal" ref={ref}>
      <h2>Cart</h2>
      <Cart submitted={submitted} />
      <form
        method="dialog"
        id="modal-actions"
        onSubmit={ handleCheckout}
      >
      {(checkout && items.length) > 0 ?
      <>
      <SubmitForm />
      <button onClick={close}>Close</button>
      <button onClick={submitHandler}>Submit</button>
      </>
       :actions
      }
      </form>
    </dialog>
  );
}

export default CartModal;
