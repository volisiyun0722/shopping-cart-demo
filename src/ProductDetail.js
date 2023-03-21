import React, { useState,useEffect } from 'react'
import {useParams,Link} from "react-router-dom"
import Title from './Title'
import QuantityBtn from './QuantityBtn'
import ProductDetailStyles from './ProductDetail.module.css'

export default function ProductDetail() {
  let params=useParams()
  let [productDetail,setProductDetail] = useState(null)

  useEffect(()=>{
    //第一種情況：沒有第二個參數，component每次render的時候，都會觸發callback function
    //第二種情況：Dependency Array是一個空陣列的時候，只會在第一次網頁render時觸發
    //第三種情況：Dependency Array有變數的時候：第一次網頁render時＋指定變數改變時也會觸發
    fetch('https://raw.githubusercontent.com/volisiyun0722/demo-api/main/react-basic-product.json')
      .then(response=>response.json())
      .then(data=>{
        let productInfo = data.find((element)=>{
          return element.id === parseInt(params.id)
      })
      setProductDetail(productInfo)
    })
  },[])//Dependency Array
  return (
    <div>
      {
        productDetail &&
        <div className={ProductDetailStyles.wrap}>
          <Title mainTitle={productDetail.name+"產品資料"}/>
          <div className={ProductDetailStyles.productInfo}>
            <img className={ProductDetailStyles.productImg} src={process.env.PUBLIC_URL+"/plant/"+productDetail.image} width={200} height={200}/>
            <div className={ProductDetailStyles.productTxt}>
              <p>名稱：{productDetail.name}</p>
              <p>售價：{productDetail.price}</p>
              <p>描述：{productDetail.description}</p>
              <QuantityBtn productInfo={productDetail}/>
            </div>
          </div>
        </div>
      }

        <Link className={ProductDetailStyles.backLink} to="/">回到產品列表</Link>
    </div>
  )
}
