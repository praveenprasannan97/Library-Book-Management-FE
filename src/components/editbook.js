import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import checkAuth from '../store/checkAuth';
import { useSelector } from "react-redux";

function EditBook() {
    var user = useSelector(store => store.auth.user);
    const { bookId } = useParams();
    const [book, setBook] = useState({
        title: '',
        ISBN: '',
        authors: ['', '', ''],
        publication_date: '',
        copies_available: 1,
    });
    const userToken = localStorage.getItem('userToken');
    const navigate = useNavigate();

    useEffect(() => {
        fetchbook();
    }, []);

    function fetchbook(){
        axios.get(`http://127.0.0.1:8000/api/books/${bookId}/`, { headers: { 'Authorization': "Token " + user.token } })
        .then((response) => {
            setBook({
            ...response.data,
            authors: [
                response.data.authors[0] || '',
                response.data.authors[1] || '',
                response.data.authors[2] || ''
            ],
            });
        })
        .catch((error) => {
            console.error('There was an error fetching the book details!', error);
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
        ...prevBook,
        [name]: value,
        }));
    };

    const handleAuthorChange = (index, value) => {
        const updatedAuthors = [...book.authors];
        updatedAuthors[index] = value;
        setBook((prevBook) => ({ ...prevBook, authors: updatedAuthors }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/books/${bookId}/`, {
            title: book.title,
            ISBN: book.ISBN,
            authors: book.authors.filter((author) => author !== ''),
            publication_date: book.publication_date,
            copies_available: book.copies_available,
            status: book.status
        }, { 
            headers: { 'Authorization': "Token " + user.token } 
        })
        .then((response) => {
            navigate('/stafflistbook');
        })
        .catch((error) => {
            console.error('There was an error updating the book!', error);
        });
    };

    return (
        <div>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Title:
            <input type="text" name="title" value={book.title} onChange={handleChange} required />
            </label>
            <br />
            <label>
            ISBN:
            <input type="text" name="ISBN" value={book.ISBN} onChange={handleChange} required />
            </label>
            <br />
            <label>
            Author 1:
            <input type="text" value={book.authors[0]} onChange={(e) => handleAuthorChange(0, e.target.value)} required />
            </label>
            <br />
            <label>
            Author 2 (Optional):
            <input type="text" value={book.authors[1]} onChange={(e) => handleAuthorChange(1, e.target.value)} />
            </label>
            <br />
            <label>
            Author 3 (Optional):
            <input type="text" value={book.authors[2]} onChange={(e) => handleAuthorChange(2, e.target.value)} />
            </label>
            <br />
            <label>
            Publication Date:
            <input type="date" name="publication_date" value={book.publication_date} onChange={handleChange} required />
            </label>
            <br />
            <label>
            Number of Copies:
            <input type="number" name="copies_available" value={book.copies_available} onChange={handleChange} required />
            </label>
            <br />
            <button type="submit">Update Book</button>
        </form>
        </div>
    );
};

export default checkAuth(EditBook);
