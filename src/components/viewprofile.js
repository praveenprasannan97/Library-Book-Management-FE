import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import checkAuth from '../store/checkAuth';
import { useSelector } from "react-redux";


function ViewProfile() {
    var user = useSelector(store => store.auth.user);
    const navigate = useNavigate();
    const [profile, setProfile] = useState("");

    useEffect(() => {
        fetchprofile();
    }, []);
    
    function fetchprofile(){
        axios.get(`http://127.0.0.1:8000/api/profile/`, { headers: { 'Authorization': "Token " + user.token } })
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }
    return(
        <div>
            <h1>User Profile</h1>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            <p>Role: {profile.group}</p>
        </div>
    );
};
export default checkAuth(ViewProfile);