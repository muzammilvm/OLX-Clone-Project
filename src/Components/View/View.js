import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../../firebase/config'

import './View.css';
function View() {
  const [UserDetails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    const userid=postDetails
    console.log(postDetails);
    const q = query(collection(db, 'user'), where("id", "==", userid));

    const querySnapshot =  getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setUserDetails(doc.data())
      console.log(UserDetails);
    });
  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src="http://localhost:3000/Images/R15V3.jpg"
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;35555  </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
      {  <div className="contactDetails">
          <p>Seller details</p>
          <p>name</p>
          <p>mobile number</p>
        </div> }
      </div>
    </div>
  );
}
export default View;
