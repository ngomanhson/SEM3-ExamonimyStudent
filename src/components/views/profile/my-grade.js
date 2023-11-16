import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";

function MyGrade() {
    const userToken = localStorage.getItem("accessToken");
    const [grade, setGrade] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(8);

    const loadGrade = useCallback(async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const gradeResponse = await api.get(url.GRADE.LIST, config);
            setGrade(gradeResponse.data);
            console.log(gradeResponse.data);
        } catch (error) {}
    }, [userToken]);

    useEffect(() => {
        loadGrade();
    }, [userToken, loadGrade]);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentGrade = grade.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead className="thead thead-background">
                    <tr>
                        <th style={{ textAlign: "center" }}>STT</th>
                        <th scope="col" style={{ textAlign: "start" }}>
                            Test Name
                        </th>
                        <th scope="col">Score</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentGrade.map((item, index) => {
                        const stt = indexOfFirstCourse + index + 1;
                        return (
                            <tr key={index}>
                                <td style={{ textAlign: "center" }}>{stt}</td>
                                <td>{item.testName}</td>
                                <td>{item.score !== null ? (parseFloat(item.score) === 0 ? 0 : parseFloat(item.score).toFixed(3)) : "Updating..."}</td>
                                <td>{item.finishAt ? (item.isPass === false ? "Not Qualified" : item.isPass === true ? "Qualified" : "") : "Updating..."}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="float-end">
                <Pagination coursesPerPage={coursesPerPage} totalCourses={grade.length} paginate={paginate} currentPage={currentPage} />
            </div>
        </div>
    );
}

export default MyGrade;

// Pagination component
const Pagination = ({ coursesPerPage, totalCourses, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map((number) => (
                <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
                    <button onClick={() => paginate(number)} className="page-link">
                        {number}
                    </button>
                </li>
            ))}
        </ul>
    );
};
