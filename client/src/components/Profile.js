import React, { useEffect, useState } from 'react'
import Unavb from './Unavbar'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import user from "../images/usericon.jpg"

const Profile = () => {
  let navigate = useNavigate();
  const [userData, setUserData] = useState('');

  // Getting data of current user and authenticating the user.
  const callUserData = async () => {
    try {
      const res = await fetch('/about',{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type": "application/json",
        },
        credentials:"include"
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/login')
    }
  }
  useEffect(() =>{
    callUserData();
  }, [])

  return (
    <>
    <Unavb/>
    <div className='container-1'>
      <div className='container-2'>
            <div className="container-3">
              <div className="container-4">
                <img src={user} atl="login img" className="user" />
              </div>
            </div>
            <div className='container-5'>
              <div className='container-6'>
                Name:
              </div>
              <br/>
              <div className='container-7'>
                {userData.name}
              </div>

            </div>
            <div className='container-5'>
              <div className='container-9'>
                Email:
              </div>
              <br/>
              <div className='container-8'>
                {userData.email}
              </div>

            </div>
            <div className='container-5'>
              <div className='container-8'>
                Registered Events:
              </div>
              <br/>
              <div className='container-8'>
                {userData.events?.length}
              </div>

            </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Profile