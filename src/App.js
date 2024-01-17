import "./App.css";
import React, { useEffect } from 'react'
import LoginComponent from "./components/auth/login";

import { app } from "./firebase";
import { getApps, getApp } from "firebase/app";

function Layout({ children }) {
  return (
    <section className="flex flex-col h-screen">{children}</section>
  );
}

function App() {

  useEffect(() => {
    let firebaseApp;
    if (!getApps().length) {
      firebaseApp = app;
    } else {
      firebaseApp = getApp(); // if already initialized, use that one
    }
  }, [])

  return (
    <Layout>
      <div className="mx-auto">
        <LoginComponent />
      </div>
    </Layout>
  );
}

export default App;
