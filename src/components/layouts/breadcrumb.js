import { Link } from "react-router-dom";

function Breadcrumb({ title }) {
    return (
        <div className="breadcrumb-area bg-overlay-black-2" style={{ backgroundImage: "url('assets/img/bg/5.webp')" }}>
            <div className="container">
                <div className="breadcrumb-inner">
                    <div className="section-title mb-0">
                        <h2 className="page-title">{title}</h2>
                        <ul className="page-list">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li> {title}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breadcrumb;
