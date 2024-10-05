import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import checkAuth from '../store/checkAuth';

function AddAuthor() {
    var user = useSelector(store => store.auth.user);
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        country: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/authors/1/', formData,{headers:{'Authorization':"Token "+ user.token}})
            .then(response => {
                setMessage('Author added successfully!');
                setFormData({
                    name: '',
                    date_of_birth: '',
                    country: ''
                });
            })
            .catch(error => {
                console.error("There was an error adding the author!", error);
                setMessage('Error adding the author.');
            });
    };

    return (
        <div>
            <h2>Add a New Author</h2>
            {message && <p>{message}</p>}
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
                <button type="submit">Add Author</button>
            </form>
        </div>
    );
};

export default checkAuth(AddAuthor);
