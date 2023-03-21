import React from 'react'
import { useContext,useState } from 'react'
import { CartContext } from './CartContext'
import btnStyles from './QuantityBtn.module.css'

export default function QuantityBtn({productInfo}) {

  const {cartItems,setCartItems} = useContext(CartContext)

  // 購物車內有無產品
  let productIndexInCart = cartItems.findIndex((element)=>{
    return element.id === productInfo.id
  })

  //findIndex
  //如果購物車內有該件產品，返回索引位置
  //如果該件產品沒有被加入購物車，返回-1



  let [numInCart,setNumInCart] = useState(
    (productIndexInCart===-1) ? 0 : cartItems[productIndexInCart].quantity
  )

  const handleAdd= ()=>{
    if(productIndexInCart === -1)
    {
      //購物車裡沒該產品，在cartItems array 加個新object
      setCartItems(
        [{
          id : productInfo.id,
          name:productInfo.name,
          image:productInfo.image,
          price:productInfo.price,
          description:productInfo.description,
          quantity:1
        },
        ...cartItems]
      )
    }
    else
    {
      //購物車裡有該產品，只加quantity
      let newCartArray=[...cartItems]
      newCartArray[productIndexInCart].quantity++
      setCartItems(newCartArray)
    }
    setNumInCart(numInCart+1)
  }
  const handleSubtract=()=>{
    if (cartItems[productIndexInCart].quantity === 1) 
    {
      //在購物車中只剩一件商品的話，remove object
      let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart,1)
            setCartItems(newCartArray)
    }
    else 
    {
      //只減個quantity
      let newCartArray = [...cartItems]
      newCartArray[productIndexInCart].quantity--
      setCartItems(newCartArray)
    }
    setNumInCart(numInCart-1)
  }
  
  return (
    <div>
        {
            (numInCart === 0)?
            <div className={`${btnStyles.btn} ${btnStyles.chartBtn}`} onClick={handleAdd}>加入購物車</div>:
            <div>
                <button className={`${btnStyles.btn} ${btnStyles.qtyBtn}`} onClick={handleSubtract}>-</button>
                <div className={btnStyles.qty}>{numInCart}</div>
                <button className={`${btnStyles.btn} ${btnStyles.qtyBtn}`} onClick={handleAdd}>+</button>
            </div>
        }
    </div>
  )
}
