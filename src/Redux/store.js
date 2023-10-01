import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { languageReducers } from "./Reducers/LangReducers";
import { contactReducer } from "./Reducers/ContactReducers";
import { showPopupReducer } from "./Reducers/PopupReducers";
import { listCartsReducer } from './Reducers/ListCartsReducer';
import { searchProductReducer } from "./Reducers/SearchReducer";
import { certifiedReducer } from "./Reducers/CertifiedReducers";
import { listPromotionsReducer } from "./Reducers/PromotionReducers";
import { DetailNewsReducer, ListNewsReducer } from "./Reducers/NewsReducers";
import { infoUserReducer, requestAddressReducer } from "./Reducers/InfoUserReducer";
import { orderCreateReducer, orderPayReducer, reOrderReducer } from "./Reducers/OrderReducers";
import { forgotPassReducer, userLoginReducer, userRegisterReducer } from './Reducers/AuthReducers';
import { CreateFBPublic, FeedbackPrivateReducers, ListFBPublic } from "./Reducers/FeedbackReducer";
import { infoProductReducer, productDetailsReducer, productListReducer, productTypeReducer } from './Reducers/ProductReducers';
import { cancelPurchaseReducer, feedbackPurchaseReducer, listPurchasesReducer } from "./Reducers/PurchaseReducers";

const reducer = combineReducers({
    language: languageReducers,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    forgotPassword: forgotPassReducer,

    listProducts: productListReducer,
    productType: productTypeReducer,
    productDetails: productDetailsReducer,
    infoProduct: infoProductReducer,

    listCarts: listCartsReducer,

    showPopup: showPopupReducer,

    searchProduct: searchProductReducer,

    orderCreate: orderCreateReducer,
    // orderWaiting: orderWaitingReducer,
    orderPay: orderPayReducer,
    contact: contactReducer,

    certified: certifiedReducer,
    news: ListNewsReducer,
    detailNews: DetailNewsReducer,

    createFBPublic: CreateFBPublic,
    listFBPublic: ListFBPublic,

    userInfo: infoUserReducer,

    promotion: listPromotionsReducer,
    listPurchases: listPurchasesReducer,
    cancelPurchase: cancelPurchaseReducer,
    feedbackPurchase: feedbackPurchaseReducer,
    FBPrivate: FeedbackPrivateReducers,

    reOrder: reOrderReducer,
    suggestAddress: requestAddressReducer,
});

const localUser = localStorage.getItem("info") ? JSON.parse(localStorage.getItem("info")) : null;
const lang = localStorage.getItem("language") ? JSON.parse(localStorage.getItem("language")) : "vi";
//Kiểm tra expired of infoUser
let infoExpired = true;
if (localUser) {
    let expiration = localUser.expiration;
    const nowTime = new Date().getTime();
    if (expiration >= nowTime) {
        infoExpired = false;
    }
}
const initialState = {
    userLogin:
        localUser ? {
            infoUser: {
                id: (localUser && !infoExpired) ? localUser.id : "",
                username: (localUser && !infoExpired) ? localUser.username : "",
            },
        } : {},

    language: {
        lang
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;