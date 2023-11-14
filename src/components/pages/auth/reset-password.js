import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../layouts/loading";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
function ResetPassword() {
    const { resetToken } = useParams();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        newPassword: "",
    });

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            valid = false;
            newErrors.email = "Please enter your email.";
        } else if (!isEmailValid(formData.email)) {
            valid = false;
            newErrors.email = "Please enter a valid email address.";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "Please enter a new password.";
            valid = false;
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "New password must be at least 6 characters.";
            valid = false;
        } else if (formData.newPassword.length > 50) {
            newErrors.newPassword = "New password must be less than 50 characters.";
            valid = false;
        }

        setFormErrors(newErrors);

        return valid;
    };

    console.log(resetToken);

    const submitResponse = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const { email, newPassword } = formData;
                const restPasswordResponse = await api.post(url.AUTH.RESET_PASSWORD + `/${resetToken}`, { email, newPassword });

                if (restPasswordResponse.status === 200) {
                    toast.success("Password reset successful. Please log in again.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    });

                    navigate("/login");
                } else {
                    toast.error("Error! An error occurred. Please try again later.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    });
                }
            } catch (error) {
                toast.error("Error! An error occurred. Please try again later.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            }
        }
    };
    return (
        <>
            <Helmet>
                <title>Reset Password | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <section className="d-flex align-items-center justify-content-center mx-auto" style={{ height: "100vh" }}>
                <div className="td-sidebar" style={{ width: "30%" }}>
                    <div className="widget">
                        <div className="text-center">
                            <img src="./assets/img/logo-2.png" alt="Examonimy" />
                        </div>

                        <form onSubmit={submitResponse}>
                            <label htmlFor="email" className="mt-3 mb-1">
                                Enter email address <span className="text-danger">*</span>
                            </label>
                            <div className="form-group form-group-2 ">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                    placeholder="user@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                            </div>

                            <label htmlFor="email" className="mt-3 mb-1">
                                Enter new password <span className="text-danger">*</span>
                            </label>
                            <div className="form-group form-group-2 ">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="newPassword"
                                    id="password"
                                    className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                                    placeholder="***********"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                                {!formErrors.password && (
                                    <div className="input-group-append">
                                        <span className="show-pass" onClick={handleTogglePassword}>
                                            {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-base mt-4" style={{ width: "100%" }}>
                                Reset Password
                            </button>
                        </form>
                        <nav className="login-card-footer-nav mt-4">
                            <Link to="/login">
                                <i class="fa fa-home"></i>
                            </Link>

                            <a href="#!">Terms of use</a>
                            <a href="#!">Privacy policy</a>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ResetPassword;
