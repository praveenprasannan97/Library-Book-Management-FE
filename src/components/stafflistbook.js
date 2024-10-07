import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../store/checkAuth';
import { useSelector } from "react-redux";

function StaffBookList() {
    var user = useSelector(store => store.auth.user);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchbook();
    }, []);

    function fetchbook(){
        axios.get('http://127.0.0.1:8000/api/books/',{ headers: { 'Authorization': "Token " + user.token } })
        .then((response) => {
            setBooks(response.data);
        })
        .catch((error) => {
            console.error('There was an error fetching the books!', error);
        });
    }

    const handleDelete = (bookId) => {
        axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, { headers: { 'Authorization': "Token " + user.token } })
        .then(() => {
            fetchbook();
        })
        .catch((error) => {
            console.error('There was an error deleting the book!', error);
        });
    };

    const handleEdit = (bookId) => {
        navigate(`/editbook/${bookId}`);
    };

    return (
        <div>
        <h2>Book List</h2>
        <table border="1">
            <thead>
            <tr>
                <th>Title</th>
                <th>Authors</th>
                <th>Publication Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authors.map((author) => author.name).join(', ')}</td>
                <td>{book.publication_date}</td>
                <td>
                    <button onClick={() => handleEdit(book.id)}>Edit</button>
                </td>
                <td>
                    <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default checkAuth(StaffBookList);
