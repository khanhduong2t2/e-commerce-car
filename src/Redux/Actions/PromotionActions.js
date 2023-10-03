import axios from 'axios';
import { listAPIs } from './API/ListAPIs';
import { getAccessTokenCommon } from './Common/getAccessToken';
import { GET_PROMOTION_FAIL, GET_PROMOTION_REQUEST, GET_PROMOTION_SUCCESS } from "../Constants/PromotionConstants";

export const getListPromotions = (customer_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PROMOTION_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }

        let inputData = { customer_id }

        let { data } = await axios.post(listAPIs.LIST_PROMOTION_EXCEPT, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: GET_PROMOTION_SUCCESS,
                payload: data.data
            })
        } else {
            dispatch({
                type: GET_PROMOTION_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_PROMOTION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}