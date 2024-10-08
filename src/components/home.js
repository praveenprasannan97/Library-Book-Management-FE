import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import checkAuth from '../store/checkAuth';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/authSlice';

function Home() {
    var user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        
    }, []);

    function authlogout() {
        if(user){
            axios.post('http://127.0.0.1:8000/api/logout/',{},{headers:{'Authorization':"Token "+ user.token}});
            dispatch(removeUser());
            navigate('/login');
        }
    }

 
  return (
    <div>
        <h1>home</h1>
        <br/>
        <Link className="nav-link text-white ms-3" onClick={authlogout}>Logout</Link>
        <br/>
        <br/>
        <Link to={'/viewprofile'}>View Profile</Link>
        <br/>
        <br/>
        <Link to={'/listbook'}>List Book</Link>
        <br/>
        <br/>
        <Link to={'/borrowhistory'}>Borrow History</Link>
        <br/>
        <br/>
    </div>
  );
}

export default checkAuth(Home);