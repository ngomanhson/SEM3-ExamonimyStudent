import { Helmet } from "react-helmet";
import api from "../../../services/api";
import url from "../../../services/url";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../layouts/loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const [formData, setFormData] = useState({
        email: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
    });

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

        setFormErrors(newErrors);

        return valid;
    };

    const submitResponse = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                setSubmitting(true);
                const { email } = formData;
                const restPasswordResponse = await api.post(url.AUTH.FORGOT_PASSWORD, { email });

                if (restPasswordResponse.status === 200) {
                    setFormSubmitted(true);

                    toast.success("Please check your email and follow the instructions.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    });
                } else {
                    toast.error("Error! An error occurred. Please try again later", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 5000,
                    });
                }
            } catch (error) {
                setFormErrors({
                    email: "Email address does not exist.",
                });
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>ForgotPassword | Examonimy</title>
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

                            {submitting && (
                                <button type="button" className="btn btn-base mt-4" disabled style={{ width: "100%" }}>
                                    <i className="fa fa-spinner fa-spin"></i> Submitting...
                                </button>
                            )}

                            {!submitting && !formSubmitted && (
                                <>
                                    <button type="submit" className="btn btn-base mt-4" style={{ width: "100%" }}>
                                        Submit
                                    </button>
                                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                </>
                            )}

                            {formSubmitted && (
                                <div className="text-start mt-2">
                                    <p className="text-success">Your password reset email has been sent.</p>
                                </div>
                            )}
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

export default ForgotPassword;
