import { ActionTypes } from '../constants'
import Api from '../../axiosapi';

export function userLogin(userdata) {
    return async function (dispatch){
        return await Api.post(`/auth/login`,userdata)
            .then(res=>{
                var userDetails = JSON.stringify({ login_status: true, user_token: res.data.token });
                localStorage.setItem('user_details',userDetails);

                dispatch({
                    type: ActionTypes.USER_LOGIN,
                    payload: res.data.token
                });
                return true;
            }).catch(err =>{
                console.log(err);
                return false;
            });
    }
}

export function userRegister(userdata) {
    return async function (dispatch){
        return await Api.post(`/auth/register`,userdata,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
            var userDetails = JSON.stringify({ login_status: true, user_token: res.data.token });
            localStorage.setItem('user_details',userDetails);

            dispatch({
                type: ActionTypes.USER_REGISTER,
                payload: res.data.token
            });
            return res;
        }).catch(err =>{
            console.log(err);
            return false;
        });
    }
}