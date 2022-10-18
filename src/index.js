import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import awsExports from './aws-exports';
import MyAuthenticator from "./Components/MyAuthenticator";
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route index={true} element={<App/>}/>
              <Route path='/login' element={<MyAuthenticator />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
