import {useRef} from "react";
import { Amplify} from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import {Auth} from "aws-amplify";
import {useSelector, useDispatch} from "react-redux";

import Header from "./Header";
import FileUpload from "./FileUpload";
import {logOut, logIn} from "../userSlice";

import awsExports from '../aws-exports';
import FileList from "./FileList";
Amplify.configure(awsExports);

function App() {

  const fileUploadCallback = () => {
      console.log('file uploaded');
      console.log(fileList);
      fileList.current.forceUpdate();
  }

  const mySignOut = async () => {
      try {
          await Auth.signOut();
      } catch (error) {
          console.log('error signing out: ', error);
      }
  }

  const fileList = useRef();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return (
      <>
        <Header user={user} />
          {user &&
        <main>
            <h1>Hello {user.name}</h1>
            <FileUpload fetchCallback={fileUploadCallback}/>
            <FileList ref={fileList}/>
        </main>}
      </>
  );
}

export default App;
