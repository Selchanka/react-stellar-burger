export  const countIngredients = (state) => {
  let count = state.ingredients.length; 
  if (state.bun !== null) 
  {count++}  
  return count;
}