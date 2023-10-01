import axios from 'axios';
import { listAPIs } from './API/ListAPIs';
import { getAccessTokenCommon } from './Common/getAccessToken';
import { SEND_CONTACT_FAIL, SEND_CONTACT_REQUEST, SEND_CONTACT_SUCCESS } from '../Constants/ContactConstants';

export const sendEmailContact = (input) => async (dispatch) => {
    try {
        dispatch({ type: SEND_CONTACT_REQUEST });

        let accessToken = await getAccessTokenCommon();
        const config = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "lang": input.lang
            }
        }

        let inputData = {
            customer_id: input.customer_id,
            name_register: input.name_register,
            phone_register: input.phone_register,
            type_car: input.type_car,
            content: input.content
        }

        let { data } = await axios.post(listAPIs.SEND_EMAIL_CONTACT, inputData, config);
        if (data.status && data.data) {
            dispatch({
                type: SEND_CONTACT_SUCCESS,
            })
        } else {
            dispatch({
                type: SEND_CONTACT_FAIL,
                payload: data.message
            })
        }
    } catch (error) {
        dispatch({
            type: SEND_CONTACT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}