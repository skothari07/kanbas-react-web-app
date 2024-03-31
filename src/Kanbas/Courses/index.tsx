import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import "./index.css"
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { TbSunglasses } from "react-icons/tb";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
    const { courseId } = useParams();
    const location = useLocation();

    const COURSES_API = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}`
        );
        setCourse(response.data);
    };
    const coursePage = location.pathname.split('/').pop();

    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);

    return (
        <>
            <div className="d-flex justify-content-between d-none d-md-block">
                <div className="col-auto">
                    <h4 className="topBar" ><HiMiniBars3 /> Course {course?.name} <span className="CoursePageName"> &gt; {coursePage} </span></h4>
                </div>
                <div className="col-auto wd-student-view">
                    <button><TbSunglasses />Student View</button>
                </div>
            </div>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
                        <Route path="Assignments/create" element={<AssignmentEditor />} />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Courses;