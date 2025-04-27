import { use, useContext, useRef, useState } from "react";
import { CartContext } from "../store/cart-context";
import CartModal from "./CartModal";

function Home() {
  const { items } = useContext(CartContext);
  const cartQuantity = items.length;
  const modal = useRef();
  const [checkout,setCheckout] = useState(false)

  function handleOpenCart() {
    modal.current.showModal();
    console.log('items',items);
    
  }
  function handleCheckout(){
    setCheckout(true);
  }
 function handleClose(){
  modal.current.close()
  setCheckout(false)
 }
 
  let modalActions = <button onClick={handleClose}>Close</button>;
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button onClick={handleClose}>Close</button>
        <button onClick={handleCheckout}>{checkout ? 'Submit' : 'Checkout'}</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} actions={modalActions} checkout={checkout} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Food App" />
          <h1>Food App</h1>
        </div>
        <p>
          <button onClick={handleOpenCart}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}

export default Home;
