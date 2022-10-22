import {useRef, useEffect} from "react";
import {Amplify} from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import {useSelector, useDispatch} from "react-redux";

import Header from "./Header";
import FileUpload from "./FileUpload";

import awsExports from '../aws-exports';
import FileList from "./FileList";
import {getAuthenticated} from "../userSlice";

Amplify.configure(awsExports);

function App() {

    const dispatch = useDispatch();
    const fileUploadCallback = () => {
        console.log('file uploaded');
        console.log(fileList);
        fileList.current.forceUpdate();
    }

    useEffect(() => {
        console.log('use effect App');
        dispatch(getAuthenticated());
    }, []);

    const fileList = useRef();
    const user = useSelector(state => state.user);

    return (
        <>
            <Header user={user}/>
            <main>
                {user && <h1>Hello {user.name}</h1>}
                {user && <FileUpload fetchCallback={fileUploadCallback}/>}
                <FileList ref={fileList}/>
            </main>
        </>
    );
}

export default App;
