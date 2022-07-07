import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import "./index.css";
import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyDMi_kmkl1llb4fphhQZ0cxu2xJoGUmudI",
  authDomain: "coderhouse-gameware.firebaseapp.com",
  projectId: "coderhouse-gameware",
  storageBucket: "coderhouse-gameware.appspot.com",
  messagingSenderId: "931270784240",
  appId: "1:931270784240:web:f76963c653928fc9e83e35"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

