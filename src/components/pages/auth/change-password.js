import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import { toast } from "react-toastify";
import Loading from "../../layouts/loading";
import Swal from "sweetalert2";

function ChangePassword() {
    const [loading, setLoading] = useState(true);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleTogglePassword = (fieldName) => {
        switch (fieldName) {
            case "currentPassword":
                setShowCurrentPassword(!showCurrentPassword);
                break;
            case "newPassword":
                setShowNewPassword(!showNewPassword);
                break;
            case "confirmPassword":
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Please enter your password.";
            valid = false;
        } else if (formData.currentPassword.length < 6) {
            newErrors.currentPassword = "Password must be at least 6 characters.";
            valid = false;
        } else if (formData.currentPassword.length > 50) {
            newErrors.currentPassword = "Password must be less than 50 characters.";
            valid = false;
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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
            valid = false;
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userToken = localStorage.getItem("accessToken");

            if (userToken) {
                const isConfirmed = await Swal.fire({
                    title: "Are you sure?",
                    text: "you want to change your password?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "I'm sure",
                });
                if (isConfirmed.isConfirmed) {
                    try {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${userToken}`,
                            },
                        };

                        const requestData = {
                            currentPassword: formData.currentPassword,
                            newPassword: formData.newPassword,
                            confirmPassword: formData.confirmPassword,
                        };

                        const passwordResponse = await api.post(url.AUTH.CHANGE_PASSWORD, requestData, config);

                        if (passwordResponse.data.success) {
                            localStorage.removeItem("accessToken");

                            navigate("/login");

                            toast.success("Password changed successfully. Please login again!", {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 5000,
                            });
                        }
                    } catch (error) {
                        toast.error("An error occurred while changing the password.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 5000,
                        });
                    }
                }
            } else {
                // Handle the case where the user is not authenticated
                toast.error("User is not authenticated. Please log in again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
            }
        }
    };

    return (
        <>
            {loading ? <Loading /> : null}
            <section className="d-flex align-items-center justify-content-center mx-auto">
                <div className="td-sidebar" style={{ width: "50%" }}>
                    <div className="widget">
                        <div className="text-center">
                            <img src="./assets/img/logo-2.png" alt="Examonimy" />
                        </div>
                        <form onSubmit={handleChangePassword}>
                            <label htmlFor="currentPassword" className="mt-3 mb-1">
                                Current password <span className="text-danger">*</span>
                            </label>
                            <div className={`form-group form-group-2${formErrors.currentPassword ? "is-invalid" : ""}`}>
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    id="currentPassword"
                                    className={`form-control ${formErrors.currentPassword ? "is-invalid" : ""}`}
                                    placeholder="***********"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                />
                                {formErrors.currentPassword && <div className="invalid-feedback">{formErrors.currentPassword}</div>}
                                {!formErrors.currentPassword && (
                                    <div className="input-group-append">
                                        <span className="show-pass" onClick={() => handleTogglePassword("currentPassword")}>
                                            {showCurrentPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <label htmlFor="newPassword" className="mt-3 mb-1">
                                New password <span className="text-danger">*</span>
                            </label>

                            <div className={`form-group form-group-2${formErrors.newPassword ? " is-invalid" : ""}`}>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    id="newPassword"
                                    className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                                    placeholder="***********"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                                {!formErrors.newPassword && (
                                    <div className="input-group-append">
                                        <span className="show-pass" onClick={() => handleTogglePassword("newPassword")}>
                                            {showNewPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <label htmlFor="confirmPassword" className="mt-3 mb-1">
                                Confirm password <span className="text-danger">*</span>
                            </label>
                            <div className={`form-group form-group-2${formErrors.confirmPassword ? " is-invalid" : ""}`}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                                    placeholder="***********"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
                                {!formErrors.confirmPassword && (
                                    <div className="input-group-append">
                                        <span className="show-pass" onClick={() => handleTogglePassword("confirmPassword")}>
                                            {showConfirmPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-base mt-4" style={{ width: "100%" }}>
                                Change Password
                            </button>
                        </form>
                        <nav className="login-card-footer-nav mt-3">
                            <a href="#!">Terms of use</a>
                            <a href="#!">Privacy policy</a>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ChangePassword;
