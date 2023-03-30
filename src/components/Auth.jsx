import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const googleSignIn = async() => {
    try {
        await signInWithPopup(auth, googleProvider);
      } catch (err) {
        console.error(err);
      }
  };

  const logOut = async() => {
    try {
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
  };

  //console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser?.photoURL);
  return (
    <div>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign in </button>

      <button onClick={googleSignIn}>Sign in with google</button>
      <button onClick={logOut}>LogOut</button>
    </div>
  );
};

export default Auth;
