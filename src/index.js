import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { ServicesModalProvider } from './context/ServicesModalProvider';
import { AddServicesModalProvider } from './context/AddServicesModalProvider';
import { SignInModalProvider } from './context/SignInModalProvider';
import { AddTechnicianModalProvider } from './context/AddTechnicianProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="914572258205-pa9fgrpvmg4vs80hmbd2ldfsnrrlji87.apps.googleusercontent.com">
      <SignInModalProvider>
        <AddTechnicianModalProvider>
          <ServicesModalProvider>
            <AddServicesModalProvider>
              <App />
            </AddServicesModalProvider>
          </ServicesModalProvider>
        </AddTechnicianModalProvider>
      </SignInModalProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
