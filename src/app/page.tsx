  import Image from "next/image";
  import "./globals.css";
  import CategoryComponent from "./category/page";
  import Homepage from "./Homepage";
  import Checkout from "./checkout/page";
  import ProductPage from "./product/page";
  import Profile from "./profile/page";
  import Login from "./login/page";
  import CartPage from "./cart/page";


  export default function Home() {
    return (
      <main>
        <div>
          {/* <CartPage2/> */}
          {/* <ProductPage2/> */}
          <Homepage/>
          {/* <Checkout/> */}
          {/* <CategoryComponent /> */}
          {/* <ProductPage/> */}
          {/* <Profile/> */}
          {/* <Login/> */}
          {/* <CartPage/> */}
          
        </div>
      </main>
    );  
  }
