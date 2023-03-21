import React from 'react'
import styles from './ProductList.module.css'
import { useState,useEffect } from 'react'
import {Link} from "react-router-dom"
import Title from './Title'
import QuantityBtn from './QuantityBtn'


export default function Productlist() {
  
  let [productList,setProductList]= useState([])
  
  //useEffect
  useEffect(()=>{
    //第一種情況：沒有第二個參數，component每次render的時候，都會觸發callback function
    //第二種情況：Dependency Array是一個空陣列的時候，只會在第一次網頁render時觸發
    //第三種情況：Dependency Array有變數的時候：第一次網頁render時＋指定變數改變時也會觸發
    fetch('https://raw.githubusercontent.com/volisiyun0722/demo-api/main/react-basic-product.json')
      .then(response=>response.json())
      .then(data=>setProductList(data))

    console.log(productList)
  },[])//Dependency Array
  
  return (
    // react fragment
    <>
        <Title mainTitle="請選擇喜歡的植物"/>
        <div className={styles.productWrap}>
          {
          productList.map(product=>(
                <div  className={styles.productItem}  key={product.id}>
                  <Link to={"/product/"+product.id}>
                  <img className={styles.productPhoto}  src={process.env.PUBLIC_URL+"/plant/"+product.image} />
                  </Link>
                  <p>{product.name}</p>
                  <p>NT{product.price}</p>
                  <QuantityBtn productInfo={product}/>
                </div>
            ))
          }
        </div>
    </>
  )
}


