import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


function Header() {
  const navigate = useNavigate()
  const auth = getAuth();
  const user = useContext(AuthContext)
  const firebase = useContext(FirebaseContext)
  // console.log(user.user);
  // console.log(user); 
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
         <span className='login' onClick={()=>{
          navigate('/')
         }}> <OlxLogo></OlxLogo></span>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span className='login' onClick={()=>{
            navigate('/login')
          }}>{user.user ? `Welcome ${user.user.displayName}` : 'Login'}</span>
          <hr />

        </div>

        {user.user && <span className='login' onClick={() => {
          signOut(auth).then(() => {
            navigate('/login')
          }).catch((error) => {
            alert(error)
          })
        }}>Logout</span>}

        <div className="sellMenu" onClick={()=>{
              navigate('/create')
            }}>
          <SellButton></SellButton>
          <div className="sellMenuContent" >
            <SellButtonPlus></SellButtonPlus>
            <span >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
