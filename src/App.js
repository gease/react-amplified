import {useState, useEffect} from "react";
import { Amplify, Storage } from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {

  let [file, setFile] = useState(null);
  let [level, setLevel] = useState('public');
  let [publicFiles, setPublicFiles] = useState([]);
  let [protectedFiles, setProtectedFiles] = useState([]);
  let [privateFiles, setPrivateFiles] = useState([]);

  const filesListFetch = async () => {
      setPublicFiles(await Storage.list('', {level: 'public'}));
      setProtectedFiles(await Storage.list('', {level: 'protected'}));
      setPrivateFiles(await Storage.list('', {level: 'private'}));
  }

  useEffect(() => {filesListFetch()}, []);
  const onFormSubmit = async (event) => {
      event.preventDefault();
      const result = await Storage.put(file.name, file, {level});
      filesListFetch();
  }

  const onRadiosChange = (event) => {
      if (event.target.checked) {
          setLevel(event.target.value);
      }
  }



  return (
      <Authenticator loginMechanisms={['username']} signUpAttributes={['name', "birthdate"]}>
          {({ signOut, user }) => (
              <main>
                  <h1>Hello {user.attributes.name}</h1>
                  <button onClick={signOut}>Sign out</button>
                  <form onSubmit={onFormSubmit}>
                      <label htmlFor='upload'>Upload a file</label>
                      <input type='file' name='upload' id="upload" onChange={(event) => setFile(event.target.files[0])}></input>
                      <input type='radio' name='privacyLevel' value='public' id="public" checked={level === 'public'} onChange={(event) => onRadiosChange(event)}/><label htmlFor='public'>Public</label>
                      <input type='radio' name='privacyLevel' value='protected' id="protected" checked={level === 'protected'} onChange={(event) => onRadiosChange(event)}/><label htmlFor='protected'>Protected</label>
                      <input type='radio' name='privacyLevel' value='private' id="private" checked={level === 'private'} onChange={(event) => onRadiosChange(event)}/><label htmlFor='private'>Private</label>
                      <button>Submit</button>
                  </form>
                  <h3>Public files</h3>
                  <ul>
                      {publicFiles.map((item) => <li key={item.key}>{item.key}</li>)}
                  </ul>
                  <h3>Protected files</h3>
                  <ul>
                    {protectedFiles.map((item) => <li key={item.key}>{item.key}</li>)}
                  </ul>
                  <h3>Private files</h3>
                  <ul>
                      {privateFiles.map((item) => <li key={item.key}>{item.key}</li>)}
                  </ul>
              </main>
          )}
      </Authenticator>
  );
}

export default App;
