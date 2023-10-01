import { CLOSE_POPUP, SHOW_POPUP } from "../Constants/PopupConstants";

export const showPopupReducer = (state = { type_popup: null, data: null }, action) => {
    switch (action.type) {
        case SHOW_POPUP:
            return {
                ...state,
                type_popup: action.payload.type_popup,
                data: action.payload.data
            }
        case CLOSE_POPUP:
            return {
                ...state,
                type_popup: null,
                data: null
            }
        default:
            return state;
    }
}