function RegisterExam() {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead className="thead-background">
                    <tr>
                        <th scope="col">Exam subject</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Laravel Framework</td>
                        <td>11:01:00 04/11/2023 (GMT+07)</td>

                        <td>
                            <button>Register</button>
                        </td>
                    </tr>
                    <tr>
                        <td>JavaScript</td>
                        <td>11:01:00 04/11/2023 (GMT+07)</td>
                        <td>
                            <button className="btn-register">Register</button>
                        </td>
                    </tr>
                    <tr>
                        <td>HTML, CSS</td>
                        <td>11:01:00 04/11/2023 (GMT+07)</td>
                        <td>
                            <button className="btn-register">Register</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default RegisterExam;
