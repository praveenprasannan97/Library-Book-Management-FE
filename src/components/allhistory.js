import React, { useEffect, useState } from 'react';
import axios from 'axios';
import checkAuth from '../store/checkAuth';
import { useSelector } from "react-redux";

function AllBorrowingHistory() {
    var user = useSelector(store => store.auth.user);
    const [borrowHistory, setBorrowHistory] = useState([]);

    useEffect(() => {
        fetchBorrowHistory();
    }, []);

    const fetchBorrowHistory = () => {
        axios.get('http://127.0.0.1:8000/api/borrowinghistory/', {
            headers: { 'Authorization': "Token " + user.token },
        })
        .then((response) => {
            setBorrowHistory(response.data);
        })
        .catch((error) => {
            console.error('There was an error fetching the borrow history!', error);
        });
    };

    return (
        <div>
            <h2>All Borrowing History</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>User Name</th>
                        <th>Borrow Date</th>
                        <th>Status</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowHistory.map((history) => (
                        <tr key={history.id}>
                            <td>{history.book.title}</td>
                            <td>{history.user.username}</td>
                            <td>{new Date(history.borrow_date).toLocaleDateString()}</td>
                            <td>{history.status}</td>
                            <td>
                                {history.return_date ? (
                                    new Date(history.return_date).toLocaleDateString()
                                ) : (
                                    'Not Returned'
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default checkAuth(AllBorrowingHistory);
