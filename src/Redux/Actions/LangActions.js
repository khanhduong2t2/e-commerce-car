import { SET_LANGUAGE } from "../Constants/LangConstants"

export const setLanguageAction = (lang) => (dispatch) => {
    dispatch({
        type: SET_LANGUAGE,
        payload: { lang }
    })

    localStorage.setItem("language", JSON.stringify(lang))
}