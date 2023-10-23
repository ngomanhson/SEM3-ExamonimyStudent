import { useState } from "react";
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setEmailValid(!!email);
        setPasswordValid(!!password);
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
