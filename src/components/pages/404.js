import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="notfound-wrapper">
                            <div className="d-flex flex-column align-items-center">
                                <img src="./assets/img/404.png" alt="Not Found" width={"30%"} className="d-block mx-auto" />
                                <h2 className="text-center">Page Not Found</h2>
                                <Link to="/" className="btn btn-notfound mt-3">
                                    <i class="fa fa-long-arrow-left"></i> Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default NotFound;
