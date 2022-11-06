import {Storage} from "aws-amplify";
import {useState} from "react";

const FileLink = ({file, level, className}) => {
    let [signedURL, setSignedURL] = useState('');
    (async () => {
        setSignedURL(await Storage.get(file.key, {level}));
    })();
    return <li className={className} key={file.key}><a href={signedURL} target="_blank">{file.key}</a></li>
}

export default FileLink;
