import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import format from "date-fns/format";

function MyCourses(props) {
    const { classId } = props;
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(8);

    const loadCourses = useCallback(async () => {
        try {
            const courseResponse = await api.get(url.CLASS_COURSE.BY_CLASSID + `?id=${classId}`);
            setCourses(courseResponse.data.data);
        } catch (error) {}
    }, [classId]);

    useEffect(() => {
        loadCourses();
    }, [classId, loadCourses]);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead className="thead thead-background">
                    <tr>
                        <th>STT</th>
                        <th scope="col">Course name</th>
                        <th scope="col">Course code</th>
                        <th scope="col">Start date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCourses.map((item, index) => {
                        const stt = indexOfFirstCourse + index + 1;
                        return (
                            <tr key={index}>
                                <td style={{ textAlign: "center" }}>{stt}</td>
                                <td>{item.name}</td>
                                <td>{item.course_code}</td>
                                <td>
                                    {format(new Date(item.createdAt), "HH:mm:ss dd/MM/yyyy")}
                                    (GMT+07)
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="float-end">
                <Pagination coursesPerPage={coursesPerPage} totalCourses={courses.length} paginate={paginate} currentPage={currentPage} />
            </div>
        </div>
    );
}

export default MyCourses;

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
