import {Button} from "@aws-amplify/ui-react";
import {useDispatch} from "react-redux";
import {logOut} from "../userSlice";

export const LogOut =  ({className}) => {
    const dispatch = useDispatch();
    return <button className={className} onClick={() => dispatch(logOut({}))}>Log Out</button>
}
