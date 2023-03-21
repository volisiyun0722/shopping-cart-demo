import { BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import { CartContext } from './CartContext';
import { useState } from 'react';
import appStyles from './App.module.css'

function App() {

  const [cartItems,setCartItems] = useState([])
  return (
    <BrowserRouter>
      <CartContext.Provider value={{cartItems,setCartItems}}>
        <div  className={appStyles.navBar}>
        <Link className={appStyles.navBtn} to="/">首頁</Link>
        <Link className={appStyles.navBtn} to="/checkout">購物車</Link>
        </div>
      
        <Routes>
          <Route path="/" element={<ProductList/>} ></Route>
          <Route path="/checkout" element={<Checkout/>} ></Route>
          
          <Route path="/product" element={<ProductDetail/>} >
            <Route path=":id" element={<ProductDetail/>}></Route>
          </Route>
          
          <Route path="*" element={<p>找不到頁面</p>}></Route>
        </Routes>

      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
