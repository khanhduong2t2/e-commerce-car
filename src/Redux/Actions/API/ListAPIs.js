const URL_API = process.env.REACT_APP_URL_API;

export const listAPIs = {
    LOGIN: `${URL_API}/v1/eco/customer/login`,
    REGISTER: `${URL_API}/v1/eco/customer/register`,
    REFRESH_TOKEN: `${URL_API}/v1/eco/customer/refresh-token`,
    FORGOT_PASSWORD: `${URL_API}/v1/eco/customer/forgot-password`,

    GET_INFO_USER: `${URL_API}/v1/eco/customer/get-info`,
    UPDATE_INFO_USER: `${URL_API}/v1/eco/customer/update-info`,
    CHANGE_PASSWORD: `${URL_API}/v1/eco/customer/change-password`,

    GET_SUGGEST_ADDRESS: `${URL_API}/v1/eco/customer/get-suggest-address`,

    ADD_NEW_CART: `${URL_API}/v1/eco/service/add-new-cart`,
    GET_LIST_CART: `${URL_API}/v1/eco/service/get-list-cart/`,
    REMOVE_ITEM_CART: `${URL_API}/v1/eco/service/remove-item-cart`,
    UPDATE_SELECT_CART: `${URL_API}/v1/eco/service/update-selected-cart`,
    UPDATE_QUANTITY_ITEM: `${URL_API}/v1/eco/service/update-quantity-item`,

    GET_LIST_NEWS: `${URL_API}/v1/eco/content/get-list-news`,
    GET_DETAIL_NEWS: `${URL_API}/v1/eco/content/get-detail-news`,
    SEND_EMAIL_CONTACT: `${URL_API}/v1/eco/service/create-contact`,
    GET_LIST_CERTIFIED: `${URL_API}/v1/eco/content/get-list-certified`,

    GET_FEEDBACK_PUBLIC: `${URL_API}/v1/eco/feedback/get-list-public`,
    CREATE_FEEDBACK_PUBLIC: `${URL_API}/v1/eco/feedback/create-feedback-public`,

    LIST_PROMOTION_EXCEPT: `${URL_API}/v1/eco/promotion/list-promotion-except`,

    GET_WAITING_ORDER: `${URL_API}/v1/eco/service/get-order-waiting`,

    CANCEL_PURCHASE: `${URL_API}/v1/eco/purchase/cancel-purchase`,
    GET_LIST_PURCHASE: `${URL_API}/v1/eco/purchase/get-list-purchase`,
    FEEDBACK_PURCHASE: `${URL_API}/v1/eco/purchase/feedback-purchase`,

    RE_ORDER: `${URL_API}/v1/eco/service/re-order`,
    ORDER_PAY: `${URL_API}/v1/eco/service/order-pay`,
    PAYMENT_PAYPAL: `${URL_API}/v1/eco/config/paypal`,
    CREATE_ORDER: `${URL_API}/v1/eco/service/create-order`,


    GET_LIST_PRODUCTS: `${URL_API}/v1/eco/product/list-products`,
    DETAIL_PRODUCT: `${URL_API}/v1/eco/product/detail-product/`,
    INFO_PRODUCT: `${URL_API}/v1/eco/product/get-info-product/`,
    GET_PRODUCT_TYPE: `${URL_API}/v1/eco/product/list-products/`,
    SEARCH_PRODUCT: `${URL_API}/v1/eco/product/search-product?key_search=`
}