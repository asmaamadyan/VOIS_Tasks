import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import { RiDeleteBinLine } from "react-icons/ri";

function Cart({submitted}) {
  const { items, updateItemQuantity, removeItemFromCart } =
    useContext(CartContext);
    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>{submitted ? 'Your Order has been Created !' :'Your Cart is empty !'}</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${(item.price * item.quantity).toFixed(2)}`;

            return (
            <li key={item.id}>
              <div>
                <span>{item.name}</span>
                <span>({formattedPrice})</span>
              </div>
              <div className="cart-item-actions">
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                   {item.quantity > 1 ? '-' : <RiDeleteBinLine id ="bin" />}
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
            </li>
            );
        })}
      </ul>
    )}
    <p id="cart-total-price">
      Cart Total: <strong>{formattedTotalPrice}</strong>
    </p>
  </div>
);
}

export default Cart;
