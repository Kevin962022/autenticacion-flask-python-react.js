import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Form = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(""); 
    const [showAlert, setShowAlert] = useState(false); 
    const navigate = useNavigate(); 

    const handleData = (e) => {
        let input_value = e.target.value;
        let type = e.target.name;
        setData({ ...data, [type]: input_value });
    };

    const validateForm = () => {
        const nameRegex = /^[A-Za-z]+$/; // Solo letras
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; // Al menos 8 caracteres, 1 especial, 2 números y 1 mayúscula
        
        if (!nameRegex.test(data.name)) {
            showAlertMessage("Nombre solo permite letras");
            return false;
        }
        
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            showAlertMessage("Email no válido");
            return false;
        }

        if (!passwordRegex.test(data.password)) {
            showAlertMessage("La contraseña requiere 8 caracteres(1 mayúscula, 1 número y un carácter especial dentro)");
            return false;
        }

        return true;
    };

    const showAlertMessage = (message) => {
        setErrorMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; 
        }

        try {
            console.log(data);
            await actions.signUp(data);

            setData({
                name: "",
                email: "",
                password: ""
            });
            navigate("/");
        } catch (e) {
            console.error(e);
            showAlertMessage("Registration failed, please try again");
        }
    };

    return (
        <>
            <form className="row g-3 text-start" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="nameAdd" className="form-label fw-semibold">Name</label>
                    <input 
                        value={data.name} 
                        name="name" 
                        type="text" 
                        className="form-control" 
                        id="nameAdd" 
                        placeholder="Nombre" 
                        onChange={handleData} 
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="emailAdd" className="form-label fw-semibold">Email</label>
                    <input 
                        value={data.email} 
                        name="email" 
                        type="email" 
                        className="form-control" 
                        id="emailAdd" 
                        placeholder="example@gmail.com" 
                        onChange={handleData} 
                        required
                    />
                </div>
                <div className="col-md-12">
                    <label htmlFor="passAdd" className="form-label fw-semibold">Password</label>
                    <input 
                        value={data.password} 
                        name="password" 
                        type="password" 
                        className="form-control" 
                        id="passAdd" 
                        placeholder="Kqweqw123@%" 
                        onChange={handleData} 
                        required
                    />
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn w-100 fw-semibold bg-success-subtle border border-black fw-bold">Register</button>
                </div>
            </form>
            {showAlert && (
                <div 
                    style={{
                        position: 'fixed', 
                        top: '20px', 
                        right: '20px', 
                        backgroundColor: 'rgba(255, 0, 0, 0.7)', 
                        color: 'white', 
                        padding: '10px', 
                        borderRadius: '5px',
                        zIndex: 1000
                    }}
                >
                    {errorMessage}
                </div>
            )}
        </>
    );
};
