import axios from 'axios'

import {USER_DATA_REQUEST, USER_DATA_SUCCESS, USER_DATA_FAILURE} from './userDataType'

const fetchUserRequest = ()=>{
    return{
        type: USER_DATA_REQUEST
    }
}

const fetchUserSuccess = (user) =>{
    return{
        type: USER_DATA_SUCCESS,
        payload: user
    }
}

const fetchUserFailure = (error) =>{
    return{
        type: USER_DATA_FAILURE,
        payload: error
    }
}
const savedCode = localStorage.getItem("code");

const requestOptions = {
    headers: { "Content-Type": "application/json" },
    body: {
      code: savedCode
    },
  };

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest())
        axios.post('http://localhost:5000', requestOptions.body)

            .then(response => {
                const users = response.data
                console.log(users)
                dispatch(fetchUserSuccess(users))
            }
            )
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchUserFailure(errorMsg))
            })
    }
}
// export const fetchUsers = () => async(dispatch) => {
//     console.log(requestOptions.body)
// try {
//     const data = await axios.post('http://localhost:5000', requestOptions.body)
//     console.log(data)
//     dispatch({type: 'FETCH_DATA', payload: data})
   
// } catch (error) {
//     console.log(error.message)
// }
// }