import React, { useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import url from "../../../services/url";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Please enter your email address.";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Please enter your password.";
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            valid = false;
        } else if (formData.password.length > 50) {
            newErrors.password = "Password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                const loginResponse = await api.post(url.AUTH.LOGIN, formData, config);
                if (loginResponse.data.success) {
                    const token = loginResponse.data.data;
                    localStorage.setItem("accessToken", token);

                    navigate("/");
                } else {
                    setFormErrors({
                        email: "Invalid email or password.",
                        password: "Invalid email or password.",
                    });
                }
            } catch (error) {
                setFormErrors({
                    email: "Invalid email or password.",
                    password: "Invalid email or password.",
                });
            }
        }
    };

    return (
        <>
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                <div className="container">
                    <div className="login-card">
                        <div className="row">
                            <div className="col-lg-7 col-md-5">
                                <img src="assets/img/bg/5.webp" alt="login" className="login-card-img" />
                            </div>
                            <div className="col-lg-5 col-md-7">
                                <div className="card-body">
                                    <div className="brand-wrapper">
                                        <img src="assets/img/logo-2.png" alt="logo" className="logo" />
                                    </div>
                                    <p className="login-card-description">Login to your account</p>
                                    <form onSubmit={handleLogin}>
                                        <div className={`form-group ${formErrors.email ? "is-invalid" : ""}`}>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                                placeholder="Enter email address"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                        </div>
                                        <div className={`form-group form-group-2${formErrors.password ? "is-invalid" : ""}`}>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                                                placeholder="***********"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                                            {!formErrors.password && (
                                                <div className="input-group-append">
                                                    <span className="show-pass" onClick={handleTogglePassword}>
                                                        {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <a href="#!" className="forgot-password-link d-block mt-3">
                                            Forgot password?
                                        </a>
                                        <button type="submit" className="btn login-btn btn-base mt-3 mb-3">
                                            Sign In
                                        </button>
                                    </form>

                                    <nav className="login-card-footer-nav mt-4">
                                        <a href="#!">Terms of use</a>
                                        <a href="#!">Privacy policy</a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;
