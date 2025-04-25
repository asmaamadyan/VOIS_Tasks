const API_KEY = "6239316368f1e2f0a574553c9208e466";

export async function fetchMeals() {
  const response = await fetch('https://www.foodrepo.org/api/v3/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${API_KEY}`
    }
  });
  
  if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
  }

  throw new Error('Failed to fetch meals');
}
