import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/breadcrumb";
import Layout from "../layouts/layouts";
import MyCourses from "../views/dashboard/my-courses";
import Profile from "../views/dashboard/profile";

function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("token");

        navigate("/login");
    };
    return (
        <>
            <Layout>
                <Breadcrumb title="Dashboard" />
                <section className="pd-top-110 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-12">
                                <div className="td-sidebar">
                                    <div className="widget widget-dashboard">
                                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            <button
                                                className="nav-link active btn btn-link mb-3"
                                                id="v-pills-home-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="v-pills-home"
                                                aria-selected="true"
                                            >
                                                {" "}
                                                <i className="fa fa-user"></i>Profile
                                            </button>
                                            <button
                                                className="nav-link btn btn-link mb-3"
                                                id="v-pills-profile-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#courses"
                                                type="button"
                                                role="tab"
                                                aria-controls="v-pills-profile"
                                                aria-selected="false"
                                            >
                                                <i className="fa fa-list-ul"></i>My Courses
                                            </button>
                                            <button
                                                className="nav-link btn btn-link mb-3"
                                                id="v-pills-settings-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#exam"
                                                type="button"
                                                role="tab"
                                                aria-controls="v-pills-settings"
                                                aria-selected="false"
                                            >
                                                <i className="fa fa-book"></i>My Exam
                                            </button>
                                            <button
                                                className="nav-link btn btn-link mb-3"
                                                id="v-pills-messages-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#grade"
                                                type="button"
                                                role="tab"
                                                aria-controls="v-pills-messages"
                                                aria-selected="false"
                                            >
                                                <i className="fa fa-bar-chart"></i>My Grade
                                            </button>

                                            <button
                                                className="nav-link btn btn-link mb-3"
                                                id="v-pills-settings-tab"
                                                data-bs-toggle="pill"
                                                data-bs-target="#settings"
                                                type="button"
                                                role="tab"
                                                aria-controls="v-pills-settings"
                                                aria-selected="false"
                                            >
                                                <i className="fa fa-cog"></i>Settings
                                            </button>
                                            <button className="nav-link btn btn-link" type="button" onClick={handleLogout}>
                                                <i className="fa fa-sign-out"></i>Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-12">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <Profile />
                                    </div>
                                    <div className="tab-pane fade" id="courses" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <MyCourses />
                                    </div>
                                    <div className="tab-pane fade" id="exam" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        My Exam
                                    </div>
                                    <div className="tab-pane fade" id="grade" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                        My Grade
                                    </div>
                                    <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                        Settings
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default Dashboard;
