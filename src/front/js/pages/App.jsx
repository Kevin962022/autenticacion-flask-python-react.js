import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Login } from "../component/Login.jsx";

export const App = () => {
    return (
        <div className="text-center d-flex justify-content-center align-items-center vh-100">
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <div className="col-12 col-md-6 p-0">
                        <img 
                            src="https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            className="img-fluid h-100 w-100 object-fit-cover rounded-0" 
                            alt="Landscape" 
                        />
                    </div>
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center bg-light">
                        <Login/>
                        <div className="text-center mt-4">
                            <p className="mb-0">Don't have an account?</p>
                            <Link to="/SignUp">
                                <button className="btn btn-link fw-semibold text-info-emphasis p-0">Sign up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
