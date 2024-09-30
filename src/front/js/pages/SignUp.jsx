import React from "react";
import { Link } from "react-router-dom";
import { Form } from "../component/Form.jsx";

export const SignUp = () => {
    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="p-4 rounded bg-light shadow">
                    <Form />
                    <div className="text-center mt-4">
                        <p className="mb-0">Do you have an account?</p>
                        <Link to="/">
                            <button className="btn btn-link fw-semibold text-info-emphasis p-0">Sign in</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
