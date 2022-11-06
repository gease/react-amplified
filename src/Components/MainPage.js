import FileUpload from "./FileUpload";
import FileList from "./FileList";
import {useSelector} from "react-redux";

const MainPage = () => {

    const user = useSelector(state => state.user);

    return (
        <>
            {<h1 className="text-5xl mx-auto my-5 w-fit uppercase text font-bold font-serif">Welcome to file repository</h1>}
            {user && <FileUpload />}
            <FileList />
        </>
    );
}

export default MainPage;
