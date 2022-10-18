import {useState} from "react";
import {Storage} from "aws-amplify";

function FileUpload({fetchCallback}) {
    let [file, setFile] = useState(null);
    let [level, setLevel] = useState('public');
    const onFormSubmit = async (event) => {
        event.preventDefault();
        await Storage.put(file.name, file, {level});
        await fetchCallback();
    }

    const onRadiosChange = (event) => {
        if (event.target.checked) {
            setLevel(event.target.value);
        }
    }

    return (
        <form onSubmit={onFormSubmit}>
            <label htmlFor='upload'>Upload a file</label>
            <input type='file' name='upload' id="upload" onChange={(event) => setFile(event.target.files[0])}></input>
            <input type='radio' name='privacyLevel' value='public' id="public" checked={level === 'public'} onChange={(event) => onRadiosChange(event)}/><label htmlFor='public'>Public</label>
            <input type='radio' name='privacyLevel' value='protected' id="protected" checked={level === 'protected'} onChange={(event) => onRadiosChange(event)}/><label htmlFor='protected'>Protected</label>
            <input type='radio' name='privacyLevel' value='private' id="private" checked={level === 'private'} onChange={(event) => onRadiosChange(event)}/><label htmlFor='private'>Private</label>
            <button>Submit</button>
        </form>
    )
}

export default FileUpload;