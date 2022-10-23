import FileUpload from "./FileUpload";
import FileList from "./FileList";
import {useSelector} from "react-redux";

const MainPage = () => {

    const user = useSelector(state => state.user);

    return (
        <>
            {user && <h1>Hello {user.name}</h1>}
            {user && <FileUpload />}
            <FileList />
        </>
    );
}

export default MainPage;
