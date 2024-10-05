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

]);

export default router;