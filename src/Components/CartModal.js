import { useContext } from "react";
import Cart from "./Cart";
import { CartContext } from "../store/cart-context";
import SubmitForm from "./SubmitForm";

function CartModal({ actions, ref, checkout }) {
  const { items } = useContext(CartContext);
  function handleCheckout(event) {
    event.preventDefault();
  }
  console.log(checkout);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted");
  }

  return (
    <dialog id="modal" ref={ref}>
      <h2>Cart</h2>
      <Cart />
      <form
        method="dialog"
        id="modal-actions"
        onSubmit={checkout && handleCheckout ? handleSubmit : handleCheckout}
      >
        {(checkout && items.length) > 0 && <SubmitForm />}
        {actions}
      </form>
    </dialog>
  );
}

export default CartModal;
