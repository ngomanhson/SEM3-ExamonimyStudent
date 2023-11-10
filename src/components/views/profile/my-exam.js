function MyExam() {
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead className="thead thead-background">
                    <tr>
                        <th style={{ textAlign: "center" }}>STT</th>
                        <th scope="col">Course Name</th>
                        <th scope="col">Course Code</th>
                        <th scope="col">Start Date</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
}

export default MyExam;
