import KanbasNavigation from "./Navigation";
import { Route, Routes, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { FaCaretDown } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";
axios.defaults.withCredentials = true;

function Kanbas() {

    const API_BASE = process.env.REACT_APP_API_BASE1;
    const [courses, setCourses] = useState<any[]>([]);

    const COURSES_API = `${API_BASE}/api/courses`;
    const findAllCourses = async () => {
        const response = await axios.get(COURSES_API);
        setCourses(response.data);
    };
    useEffect(() => {
        findAllCourses();
    }, []);

    const [course, setCourse] = useState({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg"
    });

    const addNewCourse = async () => {
        const response = await axios.post(COURSES_API, course);
        setCourses([...courses, response.data]);
    };

    const deleteCourse = async (courseId: string) => {
        const response = await axios.delete(
            `${COURSES_API}/${courseId}`
        );
        setCourses(courses.filter(
            (c) => c._id !== courseId));
    };

    const updateCourse = async () => {
        const response = await axios.put(
            `${COURSES_API}/${course._id}`,
            course
        );
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                }
                return c;
            })
        );
    };

    return (
        <>
            <Provider store={store}>
                <div className="d-block d-md-none wd-modules-top-nav">
                    <div className="row">
                        <div className="col-2 text-left inline-items"><HiMiniBars3 /></div>
                        <div className="col-9 text-center inline-items">CS5600</div>
                        <div className="col-1 text-right inline-items"><FaCaretDown /></div>
                    </div>
                </div>
            
                <div className="d-flex">
                    <div className="d-none d-md-block">
                        <KanbasNavigation />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                        <Routes>
                            <Route path="/Account/*" element={<Account />} />
                            <Route path="/" element={<Navigate to="Dashboard" />} />
                            <Route path="Dashboard" element={<Dashboard
                                                                courses={courses}
                                                                course={course}
                                                                setCourse={setCourse}
                                                                addNewCourse={addNewCourse}
                                                                deleteCourse={deleteCourse}
                                                                updateCourse={updateCourse}/>} />
                            <Route path="Courses/:courseId/*" element={<Courses />} />
                        </Routes>
                    </div>
                </div>
            </Provider></>
    );
}
export default Kanbas;