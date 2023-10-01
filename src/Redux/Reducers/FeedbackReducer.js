import { ADD_CONTENT_ANS, ADD_FAST_ANS, CREATE_FEEDBACK_PUBLIC_FAIL, CREATE_FEEDBACK_PUBLIC_REQUEST, CREATE_FEEDBACK_PUBLIC_SUCCESS, GET_FEEDBACK_PUBLIC_FAIL, GET_FEEDBACK_PUBLIC_REQUEST, GET_FEEDBACK_PUBLIC_SUCCESS, REMOVE_FAST_ANS, RESET_TYPE_FEEL, SET_TYPE_FEEL, UPDATE_CONTENT, UPDATE_NUMBER_STAR } from "../Constants/FeedbackConstant"

let initState = {
    numberStar: 0,
    content: null
}

export const CreateFBPublic = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_NUMBER_STAR:
            return {
                ...state,
                numberStar: action.payload.numberStar
            }
        case UPDATE_CONTENT:
            return {
                ...state,
                content: action.payload.content
            }
        case CREATE_FEEDBACK_PUBLIC_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_FEEDBACK_PUBLIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                numberStar: 0,
                content: null,
                errMessage: null
            }
        case CREATE_FEEDBACK_PUBLIC_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}

export const ListFBPublic = (state = {}, action) => {
    switch (action.type) {
        case GET_FEEDBACK_PUBLIC_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_FEEDBACK_PUBLIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errMessage: null,
                listFeedBack: action.payload
            }
        case GET_FEEDBACK_PUBLIC_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        default:
            return state
    }
}


let initFBPrivate = {
    type_feel: null,
    list_ans: [],
    content: null
}
export const FeedbackPrivateReducers = (state = initFBPrivate, action) => {
    let tempListAns = [...state.list_ans]
    switch (action.type) {
        case SET_TYPE_FEEL:
            return {
                ...state,
                list_ans: [],
                type_feel: action.payload.type_feel
            }
        case ADD_FAST_ANS:
            tempListAns.push(action.payload.ans)
            return {
                ...state,
                list_ans: tempListAns
            }
        case REMOVE_FAST_ANS:
            let newListAns = tempListAns.filter((item) => item !== action.payload.ans)
            return {
                ...state,
                list_ans: newListAns
            }
        case ADD_CONTENT_ANS:
            return {
                ...state,
                list_ans: tempListAns,
                content: action.payload.content
            }
        case RESET_TYPE_FEEL:
            return {
                type_feel: null,
                list_ans: [],
                content: null
            }
        default:
            return state
    }
}