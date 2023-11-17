import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import api from "../../../services/api";
import url from "../../../services/url";
import Layout from "../../layouts/layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import Loading from "../../layouts/loading";
import { Helmet } from "react-helmet";

function Course() {
    const { classId } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(6);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const shouldShowFilteredResults = searchKeyword !== "";

    const [selectedYear, setSelectedYear] = useState("");
    const [availableYears, setAvailableYears] = useState([]);

    const loadCourses = useCallback(async () => {
        const userToken = localStorage.getItem("accessToken");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };
            const courseResponse = await api.get(url.CLASS_COURSE.BY_CLASSID + `?id=${classId}`, config);

            const uniqueYears = [...new Set(courseResponse.data.data.map((course) => new Date(course.startDate).getFullYear().toString()))];

            // Filter by year
            const filteredCoursesByYear = selectedYear ? courseResponse.data.data.filter((course) => new Date(course.startDate).getFullYear().toString() === selectedYear) : courseResponse.data.data;

            // Search the courses
            const filteredCourses = filteredCoursesByYear.filter((course) => {
                return course && course.courseName && course.courseName.toLowerCase().includes(searchKeyword.toLowerCase());
            });

            setCourses(filteredCourses);
            setAvailableYears(uniqueYears);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [classId, selectedYear, searchKeyword]);

    useEffect(() => {
        loadCourses();
    }, [classId, selectedYear, searchKeyword, loadCourses]);

    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);

        const filteredCourses = courses.filter((course) => {
            return course && course.courseName && course.courseName.toLowerCase().includes(keyword.toLowerCase());
        });

        setSearchResults(filteredCourses);
    };

    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
    };

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = shouldShowFilteredResults ? searchResults.slice(indexOfFirstCourse, indexOfLastCourse) : courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const yearOptions = availableYears.map((year) => (
        <option key={year} value={year}>
            {year}
        </option>
    ));

    return (
        <>
            <Helmet>
                <title>Courses | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Courses" />
                <section className="course-area pd-top-120 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    {shouldShowFilteredResults ? (
                                        searchResults.length === 0 ? (
                                            <div className="d-flex align-items-center justify-content-center gap-3">
                                                <img src="./assets/img/404-02.png" alt="404" width={"250px"} />
                                                <div>
                                                    <h3>No courses found.</h3>
                                                    <p>Please enter keywords related to the course you are looking for.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            searchResults.map((item, index) => (
                                                <div className="col-md-6" key={index}>
                                                    <div className="single-course-inner">
                                                        <div className="details-inner">
                                                            <div className="details">
                                                                <h5>
                                                                    <Link to={`/course-detail/${item.classCourseId}`} className="line-clamp">
                                                                        {item.courseName}
                                                                    </Link>
                                                                </h5>
                                                                <p className="d-flex align-items-center">
                                                                    <img src="./assets/img/course/teacher.png" alt="icon" className="icon-course" /> {item.createByName}
                                                                </p>
                                                                <p className="d-flex align-items-center mt-2">
                                                                    <img src="./assets/img/course/study.png" alt="icon" className="icon-course" /> {item.className}
                                                                </p>
                                                                <p className="d-flex align-items-center mt-2">
                                                                    <img src="./assets/img/course/date.png" alt="icon" className="icon-course" />
                                                                    {format(new Date(item.startDate), "dd/MM/yyyy")}
                                                                </p>
                                                            </div>
                                                            <div className="course-footer">
                                                                <div className="row">
                                                                    <div className="col-6 ">
                                                                        <div className="total-student">
                                                                            <img src="assets/img/course/2.webp" alt="img" /> {item.numberOfStudents} Students
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <Link to={`/course-detail/${item.classCourseId}`} className="d-flex align-items-center justify-content-end">
                                                                            <div className="total-student">Go to course</div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    ) : currentCourses.length > 0 ? (
                                        currentCourses.map((item, index) => (
                                            <div className="col-md-6" key={index}>
                                                <div className="single-course-inner">
                                                    <div className="details-inner">
                                                        <div className="details">
                                                            <h5>
                                                                <Link to={`/course-detail/${item.classCourseId}`} className="line-clamp">
                                                                    {item.courseName}
                                                                </Link>
                                                            </h5>
                                                            <p className="d-flex align-items-center">
                                                                <img src="./assets/img/course/teacher.png" alt="icon" className="icon-course" /> {item.createByName}
                                                            </p>
                                                            <p className="d-flex align-items-center mt-2">
                                                                <img src="./assets/img/course/study.png" alt="icon" className="icon-course" /> {item.className}
                                                            </p>
                                                            <p className="d-flex align-items-center mt-2">
                                                                <img src="./assets/img/course/date.png" alt="icon" className="icon-course" />
                                                                {format(new Date(item.startDate), "dd/MM/yyyy")}
                                                            </p>
                                                        </div>
                                                        <div className="course-footer">
                                                            <div className="row">
                                                                <div className="col-6 ">
                                                                    <div className="total-student">
                                                                        <img src="assets/img/course/2.webp" alt="img" /> {item.numberOfStudents} Students
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <Link to={`/course-detail/${item.classCourseId}`} className="d-flex align-items-center justify-content-end">
                                                                        <div className="total-student">Go to course</div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No courses found.</p>
                                    )}
                                </div>
                                {!shouldShowFilteredResults && (
                                    <div className="float-end">
                                        <Pagination coursesPerPage={coursesPerPage} totalCourses={courses.length} paginate={paginate} currentPage={currentPage} />
                                    </div>
                                )}
                            </div>

                            <div className="col-lg-4 col-12">
                                <div className="td-sidebar mt-5 mt-lg-0">
                                    <div className="widget widget_search_course">
                                        <h4 className="widget-title">Search</h4>
                                        <form className="search-form single-input-inner">
                                            <input type="text" placeholder="Search here" value={searchKeyword} onChange={handleSearch} required />
                                            <button className="btn btn-base w-100 mt-3" type="submit">
                                                <i className="fa fa-search"></i> SEARCH
                                            </button>
                                        </form>
                                    </div>

                                    <div className="widget widget_tags">
                                        <h4 className="widget-title">Search by year</h4>
                                        <select className="form-select" value={selectedYear} onChange={handleYearChange}>
                                            <option value="">All Years</option>
                                            {yearOptions}
                                        </select>
                                    </div>

                                    <div className="widget widget_add mb-0">
                                        <img src="assets/img/other/add.webp" alt="img" />
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

export default Course;

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
