import { SET_LANGUAGE } from "../Constants/LangConstants"

export const languageReducers = (state = {}, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                lang: action.payload.lang
            }
        default:
            return state
    }
}