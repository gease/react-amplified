import {useRef, useState} from "react";
import {Storage} from "aws-amplify";
import {RadioGroupField, Radio, Button} from "@aws-amplify/ui-react";
import {useDispatch} from "react-redux";
import {getFiles} from "../fileSlice";

function FileUpload() {
    const [file, setFile] = useState(null);
    const [level, setLevel] = useState('public');
    const uploadRef = useRef();
    const dispatch = useDispatch();
    const onFormSubmit = async (event) => {
        event.preventDefault();
        await Storage.put(file.name, file, {level});
        setLevel('public');
        setFile(null);
        dispatch(getFiles());
        uploadRef.current.value = null;
    }

    return (
        <form className='container grid grid-cols-3 gap-2 bg-gradient-to-b from-amber-50 to-cyan-50 p-8' onSubmit={onFormSubmit}>
            <div>
                <label className='block text-2xl' htmlFor='upload'>Upload a file</label>
                <input className='block' type='file' name='upload' id="upload" ref={uploadRef} onChange={(event) => setFile(event.target.files[0])}></input>
            </div>
            <RadioGroupField className='text-2xl' name='privacyLevel' label='Privacy Level' value={level} onChange={e => setLevel(e.target.value)}>
                <Radio className='block text-base' value='public'>Public</Radio>
                <Radio className='block text-base' value='protected'>Protected</Radio>
                <Radio className='block text-base' value='private'>Private</Radio>
            </RadioGroupField>
            <Button className="btn self-center" type='submit'>Submit</Button>
        </form>
    )
}

export default FileUpload;
