import { use, useContext, useRef } from "react";
import { CartContext } from "../store/cart-context";
import CartModal from "./CartModal";

function Home() {
  const { items } = useContext(CartContext);
  const cartQuantity = items.length;
  const modal = useRef();

  function handleOpenCart() {
    modal.current.showModal();
    console.log('items',items);
    
  }
  let modalActions = <button>Close</button>;
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button onClick={()=>modal.current.close()}>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} actions={modalActions} />
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
