import { useEffect, useState } from "react";
import api from "../../services/api";
import url from "../../services/url";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [students, setStudents] = useState([]);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [error, setError] = useState("");

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const response = await api.get(url.STUDENT.LIST);
            setStudents(response.data);
        } catch (error) {}
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const student = students.find((student) => student.email === email);

        setEmailValid(!!email);
        setPasswordValid(!!password);

        if (student) {
            if (student.password === password) {
                const token = Math.random().toString(36).substring(2) + Date.now();
                sessionStorage.setItem("token", token);

                console.log("Token: " + token);

                console.log("Logged in successfully.");

                navigate("/");
            } else {
                setError("Email or password is incorrect.");
            }
        }
    };

    return (
        <>
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
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
                                        <div className={`form-group ${!emailValid ? "is-invalid" : ""}`}>
                                            <label htmlFor="email" className="sr-only">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className={`form-control  ${!emailValid ? "is-invalid" : ""}`}
                                                placeholder="Enter email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className={`form-group mb-4 ${!passwordValid ? "is-invalid" : ""}`}>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                className={`form-control ${!passwordValid ? "is-invalid" : ""}`}
                                                placeholder="***********"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <p className={`messages-login ${error ? "" : "d-none"}`}>{error}</p>
                                        <label className="input-check">
                                            Show Password
                                            <input type="checkbox" onClick={handleTogglePassword} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <button type="submit" className="btn login-btn btn-base mb-4">
                                            Sign In
                                        </button>
                                    </form>

                                    <a href="#!" className="forgot-password-link">
                                        Forgot password?
                                    </a>

                                    <nav className="login-card-footer-nav mt-5">
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
