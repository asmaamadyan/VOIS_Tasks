
import { useState } from "react";
import Cart from "./Cart";

function CartModal({actions ,ref}) {
    const [checkout , setCheckout] = useState(false)
    function handleCheckout(event) {
        event.preventDefault();
        setCheckout(true);
        
    }
    function handleSubmit(){
      console.log('submitted');
      
    }
    console.log(checkout);
    
    return ( 
        <dialog id ="modal" ref={ref}>
            <h2>Cart</h2>
            <Cart />
            <form method="dialog" id ='modal-actions' onSubmit={(checkout && handleCheckout) ? handleSubmit : handleCheckout} >
                {!checkout && actions}
            {/* </form > */}
                {checkout && (
                      // <form>
                
                      <div className="control-row">
                        <div className="control no-margin">
                          <label htmlFor="name">Name</label>
                          <input id="name" type="name" name="name"  />
                        </div>
                
                        <div className="control no-margin">
                          <label htmlFor="address">Address</label>
                          <input id="address" type="address" name="address"  />
                        </div>
                        <div className="control no-margin">
                          <label htmlFor="phone">Phone Number</label>
                          <input id="phone" type="phone" name="phone"  />
                        </div>
                      {/* <p > */}
                      {/* </p> */}
                      <div id='submit-buttons'>
                        <button onClick={()=>setCheckout(false)}>Close</button>
                        <button onClick={handleSubmit} >Submit</button>
                      </div>
                      </div>
                      
                
                      
                    )}
                    </form>
        </dialog>
    );
}

export default CartModal;