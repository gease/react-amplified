import {Button} from "@aws-amplify/ui-react";
import {useDispatch} from "react-redux";
import {logOut} from "../userSlice";

export const LogOut =  () => {
    const dispatch = useDispatch();
    return <Button onClick={() => dispatch(logOut())}>Log Out</Button>
}
