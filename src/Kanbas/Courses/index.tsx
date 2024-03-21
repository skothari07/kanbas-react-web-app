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

function Courses({ courses }: { courses: any[]; }) {
    const { courseId } = useParams();
    const location  = useLocation();
    const course = courses.find((course) => course._id === courseId);
    const coursePage = location.pathname.split('/').pop();

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
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default Courses;