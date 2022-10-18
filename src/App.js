import {useState, useEffect} from "react";
import { Amplify, Storage } from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {

  let [file, setFile] = useState(null);
  let [level, setLevel] = useState('public');

  const onFormSubmit = async (event) => {
      event.preventDefault();
      console.log(file);
      const result = await Storage.put(file.name, file, {level});

      console.log(result);
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
              </main>
          )}
      </Authenticator>
  );
}

export default App;
