import React, { useState, useContext } from 'react';
import { addDoc, collection } from 'firebase/firestore'
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { db } from '../../firebase/config'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import './Signup.css';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  // const [Users, setUsers] = useState()
  const usersCollectionRef = collection(db, "user")
  const firebase = useContext(FirebaseContext)
  const auth = getAuth();
  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, { name: username, email: email, phone: phone, password: password })
  // }

  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(firebase)
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log(user.uid);
      addDoc(usersCollectionRef, { name: username, phone: phone, id: user.uid })
      updateProfile(auth.currentUser,{
        displayName:username
       })
    }).then(() => {
      navigate('/login')
    }).catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='something went wrong'></img>
        <form onSubmit={HandleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href='ww'>Login</a>
      </div>
    </div>
  );
}
