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
        <form onSubmit={onFormSubmit}>
            <label htmlFor='upload'>Upload a file</label>
            <input type='file' name='upload' id="upload" ref={uploadRef} onChange={(event) => setFile(event.target.files[0])}></input>
            <RadioGroupField name='privacyLevel' label='Privacy Level' value={level} onChange={e => setLevel(e.target.value)}>
                <Radio value='public'>Public</Radio>
                <Radio value='protected'>Protected</Radio>
                <Radio value='private'>Private</Radio>
            </RadioGroupField>
            <Button type='submit'>Submit</Button>
        </form>
    )
}

export default FileUpload;
