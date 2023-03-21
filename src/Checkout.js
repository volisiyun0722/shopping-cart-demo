import React, { useContext } from 'react'
import Title from './Title'
import {Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import { CartContext } from './CartContext'
import checkoutStyles from './Checkout.module.css'

export default function Checkout() {
  let {cartItems}= useContext(CartContext)

  let cartEmpty=cartItems.length <= 0 ? true : false
  
  
  let grandTotal=cartItems.reduce((total,product)=>{
    return total += product.price*product.quantity
  },0)


  // 免運費金額
  const freeShippingPrice=800;
  
  return (
    <>
        <Title mainTitle="您的購物車"/>
        {
          cartEmpty &&
          <div className={checkoutStyles.noProduct}>
            購物車目前尚無商品<br/>
            <Link className={checkoutStyles.backLink} to="/"> 返回產品列表</Link>
          </div>
        }

        {
          !cartEmpty &&
          <div className={checkoutStyles.chartWrap}>
            <table className={checkoutStyles.chartTable}>
              <thead>
                <tr>
                  <th>商品資訊</th>
                  <th>單價</th>
                  <th className={checkoutStyles.tableTitle}>數量</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody id="cartSection">
                {/* 產品列表*/
                  cartItems.map(product=>(
                    <tr key={product.id}>                          
                        <td  className={checkoutStyles.productInfo}>
                          <img className={checkoutStyles.productPhoto} src={process.env.PUBLIC_URL+"/plant/"+product.image} />
                          <div className={checkoutStyles.productInfoText}>
                            <p className={checkoutStyles.productName}>{product.name}</p>
                            <p className={checkoutStyles.productDescription}>{product.description}</p>
                          </div>
                        </td>
                        
                        <td><p>{product.price}</p></td>
                        <td><QuantityBtn productInfo={product}/></td>
                        <td><p>{(parseInt(product.quantity)*parseInt(product.price)).toLocaleString('en-US')}</p></td>
                    </tr> 
                  ))
                }
              </tbody>
            </table>

            <div className={checkoutStyles.grandTotalSection} id="checkoutSection">
              <div>全部貨品總共NT$</div>
              <div className={checkoutStyles.grandTotal}>{grandTotal.toLocaleString('en-US')}</div>
              {/*免費送貨 */
                grandTotal >= freeShippingPrice ?
                <div className={checkoutStyles.freeShipping}>您已到達NT$ 800 免運門檻了</div>:
                <div className={checkoutStyles.freeShipping}>滿NT$ {freeShippingPrice}免運費<br/>
                只差NT$ {freeShippingPrice-grandTotal}</div>
              }
            </div>
          </div>
        }
    </>
  )
}
