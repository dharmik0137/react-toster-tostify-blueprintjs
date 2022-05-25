import * as types from '../allActionType';

const initialState = {
    userData: {
        data: [],
        loading: false,
        error: false,
        message: ""
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DATA:
            return {
                ...state, userData: { ...state.userData, data: action.data }
            }
        case types.ADD_DATA:
            return {
                ...state
            }
        case types.UPDATE_DATA:
            // console.log("UPDATE_DATA");
            state.userData = state.userData.map((element) => element.id === action.data.id ? ({ ...element, ...action.data }) : element)
            return {
                ...state, userData: { ...state.userData, data: action.data }
            }
        case types.SET_LOADING_TRUE:
            return {
                ...state, userData: { ...state.userData, loading: true }
            }
        case types.SET_LOADING_FALSE:
            return {
                ...state, userData: { ...state.userData, loading: false }
            }
        case types.SET_ERROR_TRUE:
            return {
                ...state, userData: { ...state.userData, loading: false, error: true, message: action.data.message }
            }
        default:
            return state
    }

}
export default reducer;