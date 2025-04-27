import { useState, useContext } from "react";
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
     <SubmitForm />
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
        {(checkout && items.length) > 0 && (
          <div className="control-row">
            <div className="control no-margin">
              <label htmlFor="name">Name</label>
              <input id="name" type="name" name="name" />
            </div>

            <div className="control no-margin">
              <label htmlFor="address">Address</label>
              <input id="address" type="address" name="address" />
            </div>
            <div className="control no-margin">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="phone" name="phone" />
            </div>
          </div>
        )}
        {actions}
      </form>
    </dialog>
  );
}

export default CartModal;
