import {useRef, useEffect} from "react";
import {Amplify} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import {useSelector, useDispatch} from "react-redux";

import Header from "./Header";
import FileUpload from "./FileUpload";

import awsExports from '../aws-exports';
import FileList from "./FileList";
import {getAuthenticated} from "../userSlice";
import {Outlet} from "react-router-dom";

Amplify.configure(awsExports);

function App() {

    const dispatch = useDispatch();
    const fileUploadCallback = () => {
        fileList.current.forceUpdate();
    }

    useEffect(() => {
        dispatch(getAuthenticated());
    }, []);

    const fileList = useRef();
    const user = useSelector(state => state.user);

    return (
        <>
            <Header user={user}/>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default App;
