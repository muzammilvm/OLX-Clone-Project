import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Components/Login/Login'
import Create from './Components/Create/Create';
import { AuthContext, FirebaseContext } from './store/Context'
import Post from './store/PostContext'
import { getAuth, onAuthStateChanged } from "firebase/auth";


/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import ViewPost from './Pages/ViewPost';

function App() {
  const auth = getAuth();
  const { setUser } = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      // if (user) {
      //   const uid = user.uid;
      // } else {
      //   // User is signed out
      //   // ...
      // }
    })
    console.log();
  })
  return (
    <Post>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Home></Home>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<ViewPost />} />
          </Routes>
        </Router>
      </div>
    </Post>
  );
}

export default App;
