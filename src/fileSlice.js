import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Storage} from "aws-amplify";

export const getFiles = createAsyncThunk('files/get',
    async () => {
        const publicFiles = await Storage.list('', {level: 'public'});
        const protectedFiles = await Storage.list('', {level: 'protected'});
        const privateFiles = await Storage.list('', {level: 'private'});
        return {publicFiles, protectedFiles, privateFiles};
    }
)

export const fileSlice = createSlice({
    name: 'files',
    initialState: {privateFiles: [], protectedFiles: [], publicFiles: []},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFiles.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getFiles.rejected, (state, action) => {
            console.log(action.error);
        });
    }
});

export default fileSlice.reducer;
