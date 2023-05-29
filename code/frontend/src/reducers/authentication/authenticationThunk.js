import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthApi from "@/network/authApi";

const signIn = createAsyncThunk(
    'authentication/signIn',
    async (loginInfo , thunkApi) => {
        const response = await AuthApi.signIn(loginInfo);
        if (response.status != 200) {
            return {
                status : false,
                message : response.data.message
            }
        }
        return response.data;
    }
)

const signUp = createAsyncThunk(
    'authentication/signUp',
    async (signUpInfo, thunkApi) => {
        const response = await AuthApi.signUp(signUpInfo)
        return response.data;
    }
)

export {
    signIn,
    signUp
}