import { Link } from "react-router-dom";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";
import { useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import Loading from "../../layouts/loading";

function Course() {
    const [courses, setCourses] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCourses = async () => {
        try {
            const courseResponse = await api.get(url.COURSE.LIST);
            const staffResponse = await api.get(url.STAFF.LIST);
            const classResponse = await api.get(url.CLASS.LIST);

            const courseData = courseResponse.data;
            const staffData = staffResponse.data;
            const classData = classResponse.data;

            setCourses(courseData);
            setStaffs(staffData);
            setClasses(classData);
        } catch (error) {}
    };

    const getStaffInfo = (createdBy) => {
        const staff = staffs.find((staff) => staff.id === createdBy);
        return staff;
    };

    const getClassInfo = (classId) => {
        const classInfo = classes.find((classInfo) => classInfo.id === classId);
        return classInfo;
    };

    useEffect(() => {
        loadCourses();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Courses" />
                <section className="course-area pd-top-120 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    {courses.map((item, index) => {
                                        const staffInfo = getStaffInfo(item.created_by);
                                        const classInfo = getClassInfo(item.class_id);
                                        return (
                                            <div className="col-md-6" key={index}>
                                                <div className="single-course-inner">
                                                    <div className="details-inner">
                                                        <div className="details">
                                                            <div className="course-meta">
                                                                <div className="row">
                                                                    <div className="col-8">
                                                                        <div className="course-author">
                                                                            <img src={staffInfo.avatar} alt={staffInfo.fullname} />
                                                                            <span>{staffInfo.fullname}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h5>
                                                                <Link to="/course/detail" className="line-clamp">
                                                                    {item.name}
                                                                </Link>
                                                            </h5>

                                                            <p className="d-flex align-items-center">
                                                                <img src="./assets/img/course/teacher.png" alt="icon" className="icon-course" /> {classInfo.name}
                                                            </p>

                                                            <p className="d-flex align-items-center mt-2">
                                                                <img src="./assets/img/course/study.png" alt="icon" className="icon-course" /> {item.course_code}
                                                            </p>

                                                            <p className="d-flex align-items-center mt-2">
                                                                <img src="./assets/img/course/date.png" alt="icon" className="icon-course" /> {classInfo.createdAt}
                                                            </p>
                                                        </div>
                                                        <div className="course-footer">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <Link to="/course/detail" className="d-flex align-items-center">
                                                                        Go to course <i class="fa fa-long-arrow-right"></i>
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
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="td-sidebar mt-5 mt-lg-0">
                                    <div className="widget widget_search_course">
                                        <h4 className="widget-title">Search</h4>
                                        <form className="search-form single-input-inner">
                                            <input type="text" placeholder="Search here" required />
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
