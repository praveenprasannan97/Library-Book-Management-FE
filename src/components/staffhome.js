import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import checkAuth from '../store/checkAuth';
import { removeUser } from '../store/authSlice';

function StaffHome(){
    var user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function authlogout() {
        if(user){
            axios.post('http://127.0.0.1:8000/api/logout/',{},{headers:{'Authorization':"Token "+ user.token}});
            dispatch(removeUser());
            navigate('/stafflogin');
        }
    }
    

    return(
        <div>
            <br/>
            <Link className="nav-link text-white ms-3" onClick={authlogout}>Logout</Link>
            <br/><br/>
            <Link to={'/createstaff'}>Create Staff</Link>
            <br/><br/>
            <Link to={'/addauthor'}>Add Author</Link>
            <br/><br/>
            <Link to={'/listauthor'}>List Author</Link>
            <br/><br/>
            <Link to={'/viewprofile'}>View Profile</Link>
            <br/><br/>
            <Link to={'/addbook'}>Add Book</Link>
            <br/><br/>
            <Link to={'/stafflistbook'}>List Book</Link>
            <br/><br/>
            <Link to={'/allborrowinghistory'}>All Borrowing History</Link>

        </div>
    );
}

export default checkAuth(StaffHome);
