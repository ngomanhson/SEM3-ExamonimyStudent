function MyCoures() {
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead className="thead thead-background">
                    <tr>
                        <th scope="col">Courses</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Laravel Framework</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>JavaScript</td>
                        <td>Jacob</td>
                        <td>tdornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>HTML, CSS</td>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MyCoures;
