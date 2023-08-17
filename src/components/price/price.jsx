export  function PriceFinish(state) {
        let newSum = 0;
        state.bun && (newSum = state.bun.price)
        state.ingredients && (
          state.ingredients.map((ingredient) => { newSum = newSum + ingredient.price })
        )
        return newSum;
};