import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as types from '../allActionType';
const axios = require('axios').default;

export const fatchData = () => {
    return async (dispatch) => {
        try {

            dispatch({ type: types.SET_LOADING_TRUE })
            const viewData = await toast.promise(axios.get("http://localhost:5000/users"), {
                pending: 'LOADING.....',
                success: 'SUCCESS....',
                error: 'ERROR...'
            }
            );
            dispatch({ type: types.SET_LOADING_FALSE })
            dispatch({
                type: types.GET_DATA,
                data: viewData.data
            })
        }
        catch (error) {
            dispatch({
                type: types.SET_ERROR_TRUE,
                data: { message: "Error while fetching data..." }

            })
        }
    }
}
export const deleteData = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: types.SET_LOADING_TRUE })
            const viewData = await toast.promise(axios.delete(`http://localhost:5000/users/${id}`), {
                pending: 'LOADING.....',
                success: 'SUCCESS....',
                error: 'ERROR...'
            }
            );
            console.log("view Data", viewData);
            dispatch({ type: types.SET_LOADING_FALSE })
            dispatch(fatchData());
        }
        catch (error) {
            dispatch({
                type: types.SET_ERROR_TRUE,
                data: { message: "Error while fetching data..." }

            })
        }
    }
}
export const addData = (user) => {
    return async (dispatch) => {
        try {
            dispatch({ type: types.SET_LOADING_TRUE })
            const viewData = await toast.promise(axios.post(`http://localhost:5000/users/`, user), {
                pending: 'LOADING.....',
                success: 'SUCCESS....',
                error: 'ERROR...'
            }
            );
            console.log("view Data", viewData);
            dispatch({ type: types.SET_LOADING_FALSE })
            dispatch(fatchData());

        }
        catch (error) {
            dispatch({
                type: types.SET_ERROR_TRUE,
                data: { message: "Error while fetching data..." }

            })
        }
    }
}
export const updateData = (user) => {
    console.log("uSER", user);
    return async (dispatch) => {
        try {
            dispatch({ type: types.SET_LOADING_TRUE })
            const viewData = await toast.promise(axios.put(`http://localhost:5000/users/${user.id}`, user), {
                pending: 'LOADING.....',
                success: 'SUCCESS....',
                error: 'ERROR...'
            }
            );
            console.log("view Data", viewData);
            dispatch({ type: types.SET_LOADING_FALSE })
            dispatch(fatchData());
        }
        catch (error) {
            dispatch({
                type: types.SET_ERROR_TRUE,
                data: { message: "Error while fetching data..." }

            })
        }
    }
}