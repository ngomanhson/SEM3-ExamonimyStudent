import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Layout from "../../layouts/layouts";
import Breadcrumb from "../../layouts/breadcrumb";
import { format } from "date-fns";
import api from "../../../services/api";
import url from "../../../services/url";
import Loading from "../../layouts/loading";
import { Helmet } from "react-helmet";

function Course() {
    const { classId, studentCode } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchKeyword, setSearchKeyword] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    const shouldShowFilteredResults = searchKeyword !== "";

    const loadCourses = useCallback(async () => {
        try {
            const courseResponse = await api.get(url.CLASS_COURSE.BY_CLASSID + `?id=${classId}`);
            setCourses(courseResponse.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [classId]);

    useEffect(() => {
        loadCourses();
    }, [classId, loadCourses]);

    // Function search
    const handleSearch = (e) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);

        const filteredCourses = courses.filter((course) => course.name.toLowerCase().includes(keyword.toLowerCase()));

        setSearchResults(filteredCourses);
    };

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
                                                                <div className="course-meta">
                                                                    <div className="row">
                                                                        <div className="col-8">
                                                                            <div className="course-author">
                                                                                <span>{item.fullname}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h5>
                                                                    <Link to={`/course-detail/${item.id}/${item.name}/${studentCode}`} className="line-clamp">
                                                                        {item.name}
                                                                    </Link>
                                                                </h5>

                                                                <p className="d-flex align-items-center">
                                                                    <img src="./assets/img/course/teacher.png" alt="icon" className="icon-course" /> {item.class_id}
                                                                </p>

                                                                <p className="d-flex align-items-center mt-2">
                                                                    <img src="./assets/img/course/study.png" alt="icon" className="icon-course" /> {item.course_code}
                                                                </p>

                                                                <p className="d-flex align-items-center mt-2">
                                                                    <img src="./assets/img/course/date.png" alt="icon" className="icon-course" />
                                                                    {format(new Date(item.createdAt), "HH:mm:ss dd/MM/yyyy")}
                                                                    (GMT+07)
                                                                </p>
                                                            </div>
                                                            <div className="course-footer">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <Link to={`/course-detail/${item.id}/${item.name}/${studentCode}`} className="d-flex align-items-center">
                                                                            <div className="total-student">
                                                                                <img src="assets/img/course/2.webp" alt="img" /> Go to course
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-6 align-self-center text-end">
                                                                        <div className="total-student">
                                                                            <img src="assets/img/course/2.webp" alt="img" /> 37 Students
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    ) : courses.length > 0 ? (
                                        courses.map((item, index) => (
                                            <>
                                                <div className="col-md-6" key={index}>
                                                    <div className="single-course-inner">
                                                        <div className="details-inner">
                                                            <div className="details">
                                                                <div className="course-meta">
                                                                    <div className="row">
                                                                        <div className="col-8">
                                                                            <div className="course-author">
                                                                                <span>{item.fullname}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5>
                                                                    <Link to={`/course-detail/${item.id}/${item.name}/${studentCode}`} className="line-clamp">
                                                                        {item.name}
                                                                    </Link>
                                                                </h5>

                                                                <p className="d-flex align-items-center">
                                                                    <img src="./assets/img/course/teacher.png" alt="icon" className="icon-course" /> {classId}
                                                                </p>

                                                                <p className="d-flex align-items-center mt-2">
                                                                    <img src="./assets/img/course/study.png" alt="icon" className="icon-course" /> {item.course_code}
                                                                </p>

                                                                <p className="d-flex align-items-center mt-2">
                                                                    <img src="./assets/img/course/date.png" alt="icon" className="icon-course" />{" "}
                                                                    {format(new Date(item.createdAt), "HH:mm:ss dd/MM/yyyy")}
                                                                    (GMT+07)
                                                                </p>
                                                            </div>
                                                            <div className="course-footer">
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <Link to={`/course-detail/${item.id}/${item.name}/${studentCode}`} className="d-flex align-items-center">
                                                                            <div className="total-student">
                                                                                <img src="assets/img/course/2.webp" alt="img" /> Go to course
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="col-6 align-self-center text-end">
                                                                        <div className="total-student">
                                                                            <img src="assets/img/course/2.webp" alt="img" /> 37 Students
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    ) : (
                                        <p>No courses found.</p>
                                    )}
                                </div>
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
                                        <h4 className="widget-title">Tags</h4>
                                        <div className="tagcloud">
                                            <a href="#!">Design</a> <a href="#!">Creative</a> <a href="#!">Article</a> <a href="#!">Portfolio</a> <a href="#!">Project</a> <a href="#!">Art</a>
                                            <a href="#!">Personal</a> <a href="#!">Landing</a>
                                        </div>
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
