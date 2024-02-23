import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import "./index.css";
import { FaCog, FaDownload, FaUpload,FaFilter } from "react-icons/fa";

function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId);
    const es = enrollments.filter((enrollment) => enrollment.course === courseId);
    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <button className="wd-grades-btn"> <FaUpload />Import</button>
                <span className="wd-grades-btn">
                    <FaDownload />
                    <select>
                        <option selected>Export</option>
                        <option>...</option>
                    </select>
                </span>
                <button className="wd-grades-btn"><FaCog /></button>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="inputStudentNames"><b>Student Names</b></label>
                    <select id="inputStudentNames" className="form-control">
                        <option selected>Search Students</option>
                        <option>...</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputAssignmentsNames"><b>Assignments Names</b></label>
                    <select id="inputAssignmentsNames" className="form-control">
                        <option selected>Search Assignments</option>
                        <option>...</option>
                    </select>
                </div>
            </div>
            <div className="d-flex mt-3 mb-3"><button> <FaFilter />Apply Filters</button></div>     
            <div className="table-responsive">
                <table className="table table-striped wd-grades-table" border={1}>
                    <thead>
                        <tr>
                            <th scope="col" rowSpan={2}>Student name</th>
                            {as.map((assignment) => (<th>{assignment.title}</th>))}
                        </tr>
                        <tr>
                            {as.map((assignment) => (<td>Out of 100</td>))}
                        </tr>
                    </thead>
                    <tbody>
                        {es.map((enrollment) => {
                            const user = users.find((user) => user._id === enrollment.user);
                            return (
                                <tr>
                                    <td>{user?.firstName} {user?.lastName}</td>
                                    {assignments.map((assignment) => {
                                        const grade = grades.find(
                                            (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                        if (grade === undefined) {
                                                return null;
                                        }
                                        return (<td key={assignment._id} className="editable-cell" contentEditable="true">{grade?.grade || ""}</td>);
                                    })}
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Grades;