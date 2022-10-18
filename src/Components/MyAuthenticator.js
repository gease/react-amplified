import {Authenticator} from "@aws-amplify/ui-react";
import {Navigate} from "react-router-dom";

export default function MyAuthenticator  () {
    return (
        <Authenticator loginMechanisms={['username']} signUpAttributes={['name', "birthdate"]}>
            {({signOut, user}) => {
                return <Navigate to='/' />
            }}
        </Authenticator>
    );
}
