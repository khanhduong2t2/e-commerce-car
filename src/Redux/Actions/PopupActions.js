import { CLOSE_POPUP, SHOW_POPUP } from "../Constants/PopupConstants"

export const showPopup = (type_popup, data) => async (dispatch) => {
    dispatch({
        type: SHOW_POPUP,
        payload: {
            type_popup, data
        }
    })
}

export const closePopup = () => async (dispatch) => {
    dispatch({
        type: CLOSE_POPUP
    })
}