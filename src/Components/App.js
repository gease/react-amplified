import {useRef} from "react";
import { Amplify} from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import Header from "./Header";
import FileUpload from "./FileUpload";

import awsExports from '../aws-exports';
import FileList from "./FileList";
Amplify.configure(awsExports);

function App({ signOut, user }) {

  const fileUploadCallback = () => {
      console.log('file uploaded');
      console.log(fileList);
      fileList.current.forceUpdate();
  }

  const fileList = useRef();

  return (
      <>
      <Header user={user} />
      <Authenticator loginMechanisms={['username']} signUpAttributes={['name', "birthdate"]}>
          {({ signOut, user }) => (
              <main>
                  <h1>Hello {user.attributes.name}</h1>
                  <button onClick={signOut}>Sign out</button>
                  <FileUpload fetchCallback={fileUploadCallback}/>
                  <FileList ref={fileList}/>
              </main>
          )}
      </Authenticator>
      </>
  );
}

export default App;
