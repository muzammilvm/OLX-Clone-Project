import React, { useEffect, useContext, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import './Post.css';
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'


import { async } from '@firebase/util';
import { PostContext } from '../../store/PostContext';

function Posts() {
  const navigate = useNavigate()
  const firebase = useContext(FirebaseContext)
  const [Products, setProducts] = useState([])
  const  setPostDetails  = useContext(PostContext)

  useEffect(() => {
    getDocs(collection(db, "products")).then((snapshot) => {
      const allPost = snapshot.docs.map((Product) => {
        return {
          ...Product.data(),
          id: Product.id

        }
      })
      setProducts(allPost)
    })
  })

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {Products.map(product => {

            return <div className="card" onClick={() => {
              navigate('/view')
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src="{product.url}" alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.Price}</p>
                <span className="kilometer">{product.Catagory}</span>
                <p className="name">{product.Name}</p>
              </div>
              <div className="date">
                <span>{product.CreatedAt}</span>
              </div>
            </div>
          })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
