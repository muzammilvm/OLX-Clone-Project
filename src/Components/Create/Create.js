import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FirebaseContext, AuthContext } from '../../store/Context'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'


const Create = () => {
  const navigate = useNavigate()
  const firebase = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [Name, setName] = useState("")
  const [Catagory, setCatagory] = useState("")
  const [Price, setPrice] = useState("")
  const [Photo,setPhoto] = useState(null)
  const storage = getStorage();

  const usersCollectionRef = collection(db, "products")

  var date = new Date()
  const handleSubmit = () => {
    console.log(Photo.name);
    const imageStorage = ref(storage, `${Photo.name}`);
    const storageRef = ref(storage, `/images/${Photo.name}`);
    uploadBytes(storageRef, File).then((data) => {
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        addDoc(usersCollectionRef, {
          Name,
          Catagory,
          Price,
          url,
          userid:user.uid,
          createdAt: date.toDateString()
        })
        navigate('/')
      })
    });

  }
  function handleChange(e) {
    console.log(e.target.files);
    setPhoto(e.target.files[0])
  }

  return (

    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={Name}
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={Catagory}
              id="fname"
              name="category"
              onChange={(e) => setCatagory(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              value={Price}
              id="fname"
              onChange={(e) => setPrice(e.target.value)}
              name="Price"
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={Photo? URL.createObjectURL(Photo):null} />
          <br />
          <input
            onChange={handleChange}
            type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>

  );
};

export default Create;
