import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Auth} from "aws-amplify";
import {getFiles} from "./fileSlice";

export const logIn = createAsyncThunk('user/logIn',
    async ({username, password}, thunkAPI) => {
        const user = await Auth.signIn(username, password);

        return user.attributes;
    }
)

export const logOut = createAsyncThunk('user/logOut',
    async ({}, thunkAPI) => {
        await Auth.signOut();
        thunkAPI.dispatch(getFiles());
        return null;
    }
)

export const getAuthenticated = createAsyncThunk('user/getUser',
    async () => {
        const user = await Auth.currentAuthenticatedUser()
        return user.attributes;
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(logIn.rejected, (state, action) => {
            console.log(action.error);
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            return null;
        });
        builder.addCase(logOut.rejected, (state, action) => {
            console.log(action.error);
        });
        builder.addCase(getAuthenticated.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getAuthenticated.rejected, (state, action) => {
            return null;
        });
    }
});

export default userSlice.reducer;
