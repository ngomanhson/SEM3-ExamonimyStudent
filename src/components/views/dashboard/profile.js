import { Link } from "react-router-dom";
function Profile() {
    return (
        <div className="td-sidebar">
            <div className="widget widget-dashboard">
                <h6>Profile Student</h6>
                <div className="pt-5">
                    <div className="row">
                        <div className="col-lg-4  mx-auto">
                            <div className="student-avatar">
                                <img src="https://avatars.githubusercontent.com/u/110463164?v=4" alt="Avatar" />
                            </div>
                            <div className="student-content">
                                <h5>Ngo Manh Son</h5>
                                <p>
                                    Student ID: asch2ad1
                                    <br />
                                    Class Name: T2207A
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div class="table-responsive">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <th>Full Name</th>
                                            <td>Ngo Manh Son</td>
                                        </tr>
                                        <tr>
                                            <th>Birthday</th>
                                            <td>23/10/2004</td>
                                        </tr>
                                        <tr>
                                            <th>Email</th>
                                            <td>sonnmth2205010@fpt.edu.vn</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>0123 456 789</td>
                                        </tr>
                                        <tr>
                                            <th>Address</th>
                                            <td>8 Ton That Thuyet, Ha Noi</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-end">
                                <Link to="/change-password" style={{ color: "#798BE8" }}>
                                    Change Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
