import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [is_staff, setIs_staff] = useState(false);
    console.log(is_staff)
    const registerUser = async () => {
        if (pass1 !== pass2) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
                username: uname,
                email: email,
                password: pass1,
                is_staff:is_staff,
            });
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };

    return(
        <div>
            <br/><br/><br/>
            <div className="row d-flex justify-content-center mx-auto">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className='container-fluid mt-5' id="signup-container">
                            <h1 id="signup-heading">Signup</h1>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <div className="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input id="signup-ipbg" type="text" value={email} onInput={(event) => setEmail(event.target.value)} className="form-control" placeholder='Email'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">User Name</label>
                                <input id="signup-ipbg" type="text" value={uname} onInput={(event) => setUname(event.target.value)} className="form-control" placeholder='User Name'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input id="signup-ipbg" type="password" value={pass1} onInput={(event) => setPass1(event.target.value)} className="form-control" placeholder='Password'/>
                            </div>
                            <div className="form-group mb-3">
                                <label class="form-label">Confirm Password</label>
                                <input id="signup-ipbg" type="password" value={pass2} onInput={(event) => setPass2(event.target.value)} className="form-control" placeholder='Confirm Password'/>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-outline-primary" onClick={registerUser} id="signup-mbtn">Signup</button>
                                <span>Already have an account? </span><Link to='/login'>Login Here</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;