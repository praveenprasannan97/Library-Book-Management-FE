import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import checkAuth from '../store/checkAuth';
import { useSelector } from 'react-redux';


function EditAuthor() {
    var user = useSelector(store => store.auth.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        country: ''
    });

    useEffect(() => {
        fetchdetails();
    }, [id, user.token]);

    function fetchdetails(){
        axios.get(`http://127.0.0.1:8000/api/authors/${id}/`, { headers: { 'Authorization': "Token " + user.token } })
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching author:', error);
            });
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/authors/${id}/`, formData, { headers: { 'Authorization': "Token " + user.token } })
            .then(() => {
                navigate('/listauthor');
            })
            .catch(error => {
                console.error('Error updating author:', error);
            });
    };

    return (
        <div>
            <h2>Edit Author</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input 
                        type="date" 
                        name="date_of_birth" 
                        value={formData.date_of_birth} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input 
                        type="text" 
                        name="country" 
                        value={formData.country} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default checkAuth(EditAuthor);
