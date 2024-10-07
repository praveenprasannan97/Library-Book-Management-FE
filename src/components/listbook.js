import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import checkAuth from '../store/checkAuth';
import { useSelector } from "react-redux";

function BookList() {
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

    const handleBorrow = (bookId) => {
        axios.patch(`http://127.0.0.1:8000/api/books/${bookId}/borrow/`, {}, {
            headers: { 'Authorization': "Token " + user.token }
        })
        .then((response) => {
            console.log(response.data.message);
            fetchbook();
        })
        .catch((error) => {
            console.error('There was an error borrowing the book!', error);
        });
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
                <th>Borrow</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book) => (
                <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.authors.map((author) => author.name).join(', ')}</td>
                <td>{book.publication_date}</td>
                {book.copies_available > 0 ? (
                <td>
                    <button onClick={() => handleBorrow(book.id)}>Borrow</button>
                </td>
                ):(
                    <td>Not Available</td>
                )}
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default checkAuth(BookList);
