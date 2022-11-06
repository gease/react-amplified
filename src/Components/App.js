import {useEffect} from "react";
import {Amplify} from 'aws-amplify';
//import '@aws-amplify/ui-react/styles.css';
import {useSelector, useDispatch} from "react-redux";

import Header from "./Header";

import awsExports from '../aws-exports';
import {getAuthenticated} from "../userSlice";
import {Outlet} from "react-router-dom";

Amplify.configure(awsExports);

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthenticated());
    }, []);
    const user = useSelector(state => state.user);
    return (
        <>
            <Header user={user}/>
            <main className='border-l-amber-800 border-l'>
                <Outlet />
            </main>
        </>
    );
}

export default App;
