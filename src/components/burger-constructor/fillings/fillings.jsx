import { useCallback, useState } from "react";
import update from 'immutability-helper'

function Fillings({ingredients}) {
    
  const Card = ({item}) => {console.log("Меня не видно") }
  
  const renderCard = (item, index) => { console.log("Я виден")
    return (
      <Card
        key={item.id}
        index={index}
        id={item.id}
        item={item}
        
      />
    )
  }
   

return ( <>
  <div>{ingredients.map((item, i) => {renderCard(item, i)})}</div>
  </>
)
}

export default Fillings;


