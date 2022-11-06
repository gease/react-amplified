import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {LogOut} from "./LogOut";

function Header () {
    const user = useSelector(state => state.user);
    if (!user) {
        return (
            <header className='grid grid-cols-2 items-center bg-gradient-to-bl from-amber-200 to-amber-800 p-2.5 overflow-auto rounded-lg'>
                <div className='text-white'>You are not logged in</div>
                <Link className="justify-self-end btn hover:cursor-pointer" to='/login'>Log in or sign up</Link>
            </header>
        );
    }
    else {
        console.log(user);

        return (
            <header className='grid grid-cols-2 items-center bg-gradient-to-bl from-amber-200 to-amber-800 p-2.5 overflow-auto rounded-lg'>
                <div className='text-white'>Welcome {user.name}</div>
                <LogOut className="justify-self-end btn"/>
            </header>
        );
    }
}

export default Header;
