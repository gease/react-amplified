import {Navigate} from "react-router-dom";
import {TextField, PasswordField, Button} from "@aws-amplify/ui-react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../userSlice";

export default function MyAuthenticator  () {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    if (user) return <Navigate to='/' />

    return (
        <form onSubmit={(e) => {e.preventDefault(); dispatch(logIn({username: name, password}));}}>
            <TextField label='User Name' name='name' value={name} onChange={e => setName(e.target.value)}/>
            <PasswordField label='Password' name='password' value={password}
                           onChange={e => setPassword(e.target.value)}/>
            <Button type='submit'>Log In</Button>
        </form>
    );
}
