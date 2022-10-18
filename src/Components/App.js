import {useState, useEffect} from "react";
import { Amplify, Storage } from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import Header from "./Header";
import FileUpload from "./FileUpload";

import awsExports from '../aws-exports';
import FileLink from "./FileLink";
Amplify.configure(awsExports);

function App({ signOut, user }) {

  let [publicFiles, setPublicFiles] = useState([]);
  let [protectedFiles, setProtectedFiles] = useState([]);
  let [privateFiles, setPrivateFiles] = useState([]);

  const filesListFetch = async () => {
      setPublicFiles(await Storage.list('', {level: 'public'}));
      setProtectedFiles(await Storage.list('', {level: 'protected'}));
      setPrivateFiles(await Storage.list('', {level: 'private'}));
  }

  useEffect(() => {filesListFetch()}, []);

  return (
      <>
      <Header user={user} />
      <Authenticator loginMechanisms={['username']} signUpAttributes={['name', "birthdate"]}>
          {({ signOut, user }) => (
              <main>
                  <h1>Hello {user.attributes.name}</h1>
                  <button onClick={signOut}>Sign out</button>
                  <FileUpload fetchCallback={filesListFetch}/>
                  <h3>Public files</h3>
                  <ul>
                      {publicFiles.map((item) => <FileLink file={item} level='public' />)}
                  </ul>
                  <h3>Protected files</h3>
                  <ul>
                    {protectedFiles.map((item) => <FileLink file={item} level='protected'/>)}
                  </ul>
                  <h3>Private files</h3>
                  <ul>
                      {privateFiles.map((item) => <FileLink file={item} level='private'/>)}
                  </ul>
                  <a onClick={filesListFetch}> Refresh list of files</a>
              </main>
          )}
      </Authenticator>
      </>
  );
}

export default App;
