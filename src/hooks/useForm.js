import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/cart-context";

function useForm(itemQuantity, checkoutFn) {
    const [checkout , setCheckout] = useState(false);
    const [isEmpty , setIsEmpty] = useState(false);
    const {items} = useContext(CartContext)
    useEffect(()=>{

        if(itemQuantity === 0){
            setIsEmpty(false)
        }else{
            setIsEmpty(true)
        }

    },[items])
    
    return {
        checkout,
        setCheckout,
        isEmpty
    };
}

export default useForm;