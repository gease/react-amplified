import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import filesReducer from './fileSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        files: filesReducer
    },
});
