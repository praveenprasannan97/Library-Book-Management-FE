import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/signup";
import Login from "./components/login";
import StaffLogin from "./components/stafflogin";
import CreateStaff from "./components/createstaff";
import StaffHome from "./components/staffhome";
import Home from "./components/home";
import AddAuthor from "./components/addauthor";
import AuthorList from "./components/listauthor";
import EditAuthor from "./components/editauthor";
import ViewProfile from "./components/viewprofile";
import AddBook from "./components/addbook";
import StaffBookList from "./components/stafflistbook";
import EditBook from "./components/editbook";
import BookList from "./components/listbook";
import BorrowHistory from "./components/borrowhistory";
import AllBorrowingHistory from "./components/allhistory";


const router = createBrowserRouter([
    { path: '', element: <App/>},
    { path: 'signup', element: <Signup/>},
    { path: 'login', element: <Login/>},
    { path: 'stafflogin', element: <StaffLogin/>},
    { path: 'staffhome', element: <StaffHome/>},
    { path: 'createstaff', element: <CreateStaff/>},
    { path: 'home', element: <Home/>},
    { path: 'addauthor', element: <AddAuthor/>},
    { path: 'listauthor', element: <AuthorList/>},
    { path: 'editauthor/:id', element: <EditAuthor/>},
    { path: 'viewprofile', element: <ViewProfile/>},
    { path: 'addbook', element: <AddBook/>},
    { path: 'stafflistbook', element: <StaffBookList/>},
    { path: 'editbook/:bookId', element: <EditBook/>},
    { path: 'listbook', element: <BookList/>},
    { path: 'borrowhistory', element:<BorrowHistory/>},
    { path: 'allborrowinghistory', element:<AllBorrowingHistory/>}
]);

export default router;