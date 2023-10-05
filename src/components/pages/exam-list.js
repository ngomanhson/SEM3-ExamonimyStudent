import { Link } from "react-router-dom";
import Breadcrumb from "../layouts/breadcrumb";

function ExamList() {
    return (
        <>
            <Breadcrumb title="Exam List" />
            <section className="pd-top-110 pd-bottom-120">
                <div className="container">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <section className="section-title">
                                <h6 class="sub-title right-line">Exam List</h6>
                                <h2 class="title">Here is the test for you.</h2>

                                <Link to="/multiple-choice" className="btn btn-base-2 d-flex justify-content-between " style={{ width: "100%" }}>
                                    Web Development with ASP.NET MVC and CORE
                                    <p className="text-white">DUE DATE: 2023-10-04 16:00:00 (GMT+07)</p>
                                </Link>

                                <Link to="/practical-exam" className="btn btn-base-2 d-flex justify-content-between " style={{ width: "100%" }}>
                                    Web Development with ASP.NET MVC and CORE
                                    <p className="text-white">DUE DATE: 2023-10-04 16:00:00 (GMT+07)</p>
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ExamList;
