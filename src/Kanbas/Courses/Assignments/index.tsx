import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaCaretDown } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
//import { assignments } from "../../Database";
import './index.css';
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { deleteAssignment} from "./reducer";

function Assignments() {
    const { courseId } = useParams();
    
    const assignmentList = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments);
    const dispatch = useDispatch();
//const assignmentList = assignments.filter((assignment) => assignment.course === courseId);
    return (
        <>
            <div className="row justify-content-between">
                <div className="col-auto search-assignment">
                    <input type="text" className="form-control" placeholder="Search for Assignment" />      
                </div>
                <div className="col-auto">
                    <button>+ Group</button>
                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/create`} className="wd-assignment-title"><button className="wd-assignments-bg-red">+ Assignment</button></Link>
                    <button><FaEllipsisV /></button>
                </div>
            </div>
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaEllipsisV className="me-2" /><FaCaretDown /><b>ASSIGNMENTS</b>
                        <span className="float-end">
                            <span className="wd-assignments-percentage">40% of total</span>
                            <FaCheckCircle className="text-success" />
                            <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                        </span>
                    </div>
                    <ul className="list-group">
                        {assignmentList.filter((assignment) => assignment.course === courseId).map((assignment) => (
                            <li className="list-group-item" key={assignment._id}>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <FaEllipsisV className="me-2" />
                                    <BsPencilSquare />
                                </div>
                                <div className="col wd-assignment-details">
                                    <p className="mb-1"><Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} className="wd-assignment-title">{assignment.title}</Link></p>
                                    <p className="mb-0 wd-assignments-text-xs text-muted">{assignment.desc}</p>
                                        <p className="mb-0 wd-assignments-text-xs text-muted">Due {new Date(assignment.due_date).toDateString()} | {assignment.points}</p>
                                </div>
                                <div className="col-auto">
                                    <span>
                                        <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /><button onClick={() => dispatch(deleteAssignment(assignment._id))} className="wd-assignments-edit-bg-red wd-assignments-edit-txt-white">Delete</button>
                                    </span>
                                </div>
                            </div>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
export default Assignments;