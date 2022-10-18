import {Auth} from "aws-amplify";
import {useState} from "react";

function Header () {
    let [user, setUser] = useState('');
    (async () => {const {attributes} = await Auth.currentAuthenticatedUser(); setUser(attributes.name)})();
    //console.log(user);
    if (user === '') return <header>You are not logged in</header>
    else return <header>Welcome {user}</header>
}

export default Header;
