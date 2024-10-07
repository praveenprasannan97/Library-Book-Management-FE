import React, { useState } from "react";
import axios from "axios";
import checkAuth from '../store/checkAuth';
import { useSelector } from "react-redux";

function AddBook() {
    var user = useSelector(store => store.auth.user);
    const [title, setTitle] = useState("");
    const [ISBN, setISBN] = useState("");
    const [author1, setAuthor1] = useState("");
    const [author2, setAuthor2] = useState("");
    const [author3, setAuthor3] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [copiesAvailable, setCopiesAvailable] = useState(1);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookData = {
        title,
        ISBN,
        authors: [author1, author2, author3].filter(Boolean),
        publication_date: publicationDate,
        copies_available: copiesAvailable,
        };

        try {
        const response = await axios.post("http://127.0.0.1:8000/api/books/1/", bookData, { headers: { 'Authorization': "Token " + user.token } });
        setMessage("Book added successfully!");
        } catch (error) {
        setMessage("Error adding book: " + error.message);
        }
    };

    return (
        <div>
        <h2>Add a New Book</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            </div>

            <div>
            <label>ISBN:</label>
            <input
                type="text"
                value={ISBN}
                onChange={(e) => setISBN(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Author 1 ID:</label>
            <input
                type="number"
                value={author1}
                onChange={(e) => setAuthor1(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Author 2 ID (optional):</label>
            <input
                type="number"
                value={author2}
                onChange={(e) => setAuthor2(e.target.value)}
            />
            </div>

            <div>
            <label>Author 3 ID (optional):</label>
            <input
                type="number"
                value={author3}
                onChange={(e) => setAuthor3(e.target.value)}
            />
            </div>

            <div>
            <label>Publication Date:</label>
            <input
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Copies Available:</label>
            <input
                type="number"
                value={copiesAvailable}
                onChange={(e) => setCopiesAvailable(e.target.value)}
                required
            />
            </div>

            <button type="submit">Add Book</button>
        </form>

        {message && <p>{message}</p>}
        </div>
    );
};

export default checkAuth(AddBook);
