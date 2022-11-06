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
        <section className='grid grid-cols-3 gap-2 mt-10 bg-gradient-to-b from-amber-50 to-cyan-50 p-8'>
            <section>
                <h3 className="text-3xl">Public files</h3>
                <ul>
                    {publicFiles.map((item) => <FileLink className='text-emerald-800 hover:font-bold' key={item.key} file={item} level='public' />)}
                </ul>
            </section>
            <section>
                <h3 className="text-3xl">Protected files</h3>
                <ul>
                    {protectedFiles.map((item) => <FileLink className='text-emerald-800 hover:font-bold' key={item.key} file={item} level='protected'/>)}
                </ul>
            </section>
            <section>
                <h3 className="text-3xl">Private files</h3>
                <ul>
                    {privateFiles.map((item) => <FileLink className='text-emerald-800 hover:font-bold' key={item.key} file={item} level='private'/>)}
                </ul>
            </section>
            <a className='btn hover:cursor-pointer' onClick={() => dispatch(getFiles())}> Refresh list of files</a>
        </section>
    );
}

export default FileList;
