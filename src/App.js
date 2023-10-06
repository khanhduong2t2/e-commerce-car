import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import News from './components/News/News.component';
import HomePage from './components/Home/HomePage.component';
import ListCart from './components/Cart/ListCart.component';
import Contact from './components/Contact/Contact.component';
import OrderPage from './components/Order/OrderPage.component';
import ChangeInfo from './components/Info/ChangeInfo.component';
import DetailNews from './components/News/DetailNews.component';
import Certified from './components/Certified/Certified.component';
import ProductType from './components/Product/ProductType.component';
import DetailProduct from './components/Product/DetailProduct.component';
import Purchase from './components/Purchase/Purchase.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Route path={["/", "/home"]} exact={true} component={HomePage}></Route>
        <Route path="/change-info" exact={true} component={ChangeInfo}></Route>
        <Route path="/my-purchase" exact={true} component={Purchase}></Route>
        <Route path="/product/:typeCar" exact={true} component={ProductType}></Route>
        <Route path="/detail-product/:product_id" exact={true} component={DetailProduct}></Route>

        <Route path="/news-events" exact={true} component={News}></Route>
        <Route path="/detail-news/:id" exact={true} component={DetailNews}></Route>

        <Route path="/certified" exact={true} component={Certified}></Route>

        {/* Service */}
        <Route path="/cart" exact={true} component={ListCart}></Route>
        <Route path="/order" exact={true} component={OrderPage}></Route>
        <Contact></Contact>
        <Footer></Footer>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
