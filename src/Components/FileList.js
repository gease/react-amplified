import FileLink from "./FileLink";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../fileSlice";

const FileList = () => {

    const {publicFiles, protectedFiles, privateFiles} = useSelector(state => state.files);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFiles());
    }, []);


    return (
        <>
            <h3>Public files</h3>
            <ul>
                {publicFiles.map((item) => <FileLink key={item.key} file={item} level='public' />)}
            </ul>
            <h3>Protected files</h3>
            <ul>
                {protectedFiles.map((item) => <FileLink key={item.key} file={item} level='protected'/>)}
            </ul>
            <h3>Private files</h3>
            <ul>
                {privateFiles.map((item) => <FileLink key={item.key} file={item} level='private'/>)}
            </ul>
            <a onClick={() => dispatch(getFiles())}> Refresh list of files</a>
        </>
    );
}

export default FileList;
