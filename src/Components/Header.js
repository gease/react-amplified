import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {LogOut} from "./LogOut";

function Header () {
    const user = useSelector(state => state.user);
    if (!user) {
        return (
            <header>
                You are not logged in
                <Link to='/login'>Log in or sign up</Link>
            </header>
        );
    }
    else {
        console.log(user);

        return (
            <header>
                Welcome {user.name}
                <LogOut/>
            </header>
        );
    }
}

export default Header;
