import { Amplify } from 'aws-amplify';
import {Authenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
      <Authenticator loginMechanisms={['username']} signUpAttributes={['name', "birthdate"]}>
          {({ signOut, user }) => (
              <main>
                  <h1>Hello {user.attributes.name}</h1>
                  <button onClick={signOut}>Sign out</button>
              </main>
          )}
      </Authenticator>
  );
}

export default App;
