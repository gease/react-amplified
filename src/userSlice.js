import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Auth} from "aws-amplify";

export const logIn = createAsyncThunk('user/logIn',
    async ({username, password}, thunkAPI) => {
        const user = await Auth.signIn(username, password);
        return user.attributes;
    }
)

export const logOut = createAsyncThunk('user/logOut',
    async () => {
        await Auth.signOut();
        return null;
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
    }
});

export default userSlice.reducer;
