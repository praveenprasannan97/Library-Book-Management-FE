import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../store/checkAuth';
import { useSelector } from 'react-redux';

function AuthorList() {
    var user = useSelector(store => store.auth.user);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchauthor();
    }, [user.token]);

    function fetchauthor() {
        axios.get('http://127.0.0.1:8000/api/listauthors/', { headers: { 'Authorization': "Token " + user.token } })
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => {
                console.error('Error fetching authors:', error);
            });
    }

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/authors/${id}/`, { headers: { 'Authorization': "Token " + user.token } })
            .then(() => {
                fetchauthor();
            })
            .catch(error => {
                console.error('Error deleting author:', error);
            });
    };

    const handleEdit = (id) => {
        navigate(`/editauthor/${id}`);
    };

    return (
        <div>
            <h2>Authors List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id}>
                            <td>{author.name}</td>
                            <td>
                                <button onClick={() => handleEdit(author.id)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(author.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default checkAuth(AuthorList);
