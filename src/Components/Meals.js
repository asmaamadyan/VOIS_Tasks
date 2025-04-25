import { useContext, useEffect, useState } from "react";
import mealsData from "../data/meals.json";
import { fetchMeals } from "../http";
import { CartContext } from "../store/cart-context";
function Meals() {



    const {addItemToCart,items} = useContext(CartContext);
    console.log('cart context', items);
    
    return (
        <>
    <section id="shop">
      <ul id="products">
        {mealsData.map((meal) => (
            <li key={meal.id}>
            <article className="product">
       <img src={meal.image} alt={meal.name} />
       <div className="product-content">
         <div>
           <h3>{meal.name}</h3>
           <h4>{meal.description}</h4>
           <p className='product-price'>${meal.price}</p>
         </div>
         <p className='product-actions'>
           <button onClick={()=>addItemToCart(meal.id)} >Add to Cart</button>
         </p>
       </div>
     </article>
     </li>
        ))}
      </ul>
      </section>
    </>
  );
}

export default Meals;

/* ------Tried to use API ----
  const [fetchedmeals , setFetchedMeals] = useState([])
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  useEffect(()=>{
      async function fetchingMeals(){
          setIsFetching(true);
          try{
              const meals = await fetchMeals();
              setFetchedMeals(meals.data);
              setIsFetching(false);
              console.log('meals ', fetchMeals);
              
          }catch(error){
              setError({ message: error.message || "Something went wrong!" });
              setIsFetching(false);
          }
      }
      fetchingMeals();
  },[])
  */