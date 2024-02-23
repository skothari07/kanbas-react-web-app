import KanbasNavigation from "./Navigation";
import { Route, Routes, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { FaCaretDown } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import "./index.css"

function Kanbas() {
    return (
        <>
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
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="Account" element={<h1>Account</h1>} />
                        <Route path="Dashboard" element={<Dashboard />} />
                        <Route path="Courses/:courseId/*" element={<Courses />} />
                    </Routes>
                </div>
            </div></>
    );
}
export default Kanbas;