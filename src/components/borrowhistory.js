import React, { useEffect, useState } from 'react';
import axios from 'axios';
import checkAuth from '../store/checkAuth';
import { useSelector } from "react-redux";

function BorrowHistory() {
    var user = useSelector(store => store.auth.user);
    const [borrowHistory, setBorrowHistory] = useState([]);

    useEffect(() => {
        fetchBorrowHistory();
    }, []);

    const fetchBorrowHistory = () => {
        axios.get('http://127.0.0.1:8000/api/my_borrowing/', {
            headers: { 'Authorization': "Token " + user.token },
        })
        .then((response) => {
            setBorrowHistory(response.data);
        })
        .catch((error) => {
            console.error('There was an error fetching the borrow history!', error);
        });
    };

    const handleReturn = (bookId) => {
        axios.patch(`http://127.0.0.1:8000/api/books/${bookId}/return/`, {}, {
            headers: { 'Authorization': "Token " + user.token },
        })
        .then((response) => {
            fetchBorrowHistory();
        })
        .catch((error) => {
            console.error('There was an error returning the book!', error);
        });
    };

    return (
        <div>
            <h2>My Borrow History</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Borrow Date</th>
                        <th>Status</th>
                        <th>Return</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowHistory.map((history) => (
                        <tr key={history.id}>
                            <td>{history.book.title}</td>
                            <td>{new Date(history.borrow_date).toLocaleDateString()}</td>
                            <td>{history.status}</td>
                            <td>
                                {history.status === 'returned' ? (
                                    <span>Returned on {new Date(history.return_date).toLocaleDateString()}</span>
                                ) : (
                                    <button onClick={() => handleReturn(history.id)}>Return</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default checkAuth(BorrowHistory);
