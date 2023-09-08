import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import ListProduct from './components/Product/ListProduct.component';
import DetailProduct from './components/Product/DetailProduct.component';

import { BrowserRouter, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Route path="/" exact={true} component={ListProduct}></Route>
        <Route path="/detail-product/:slug" exact={true} component={DetailProduct}></Route>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
