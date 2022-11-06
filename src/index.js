import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './Components/App';
import { Amplify } from 'aws-amplify';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import store from "./store";
import MainPage from "./Components/MainPage";
import MyAuthenticator from "./Components/MyAuthenticator";
import reportWebVitals from "./reportWebVitals";

import awsExports from './aws-exports';
Amplify.configure(awsExports);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<App/>}>
                  <Route index={true} element={<MainPage />} />
                  <Route path='login' element={<MyAuthenticator />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
