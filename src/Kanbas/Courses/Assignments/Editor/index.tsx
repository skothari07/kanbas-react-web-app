import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
//import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import "./index.css";
import {
    addAssignment,
    updateAssignment,
    setAssignment,
} from "../reducer";
import { KanbasState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";



function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignmentList = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments);
    let assignment = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    if(typeof assignmentId !== 'undefined'){
    assignment = assignmentList.find(
        (assignment) => assignment._id === assignmentId);
    }
    const { courseId } = useParams();
    const navigate = useNavigate();

    const handleSave = () => {
        if (assignmentId === undefined) {
            dispatch(addAssignment({ ...assignment, course: courseId }));
        } else {
            dispatch(updateAssignment(assignment));
        }
        
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    return (
        <div>
            <div className="d-flex justify-content-end">
                <span className="wd-assignments-published"><FaCheckCircle className="text-success" /> Published</span>
                <button><FaEllipsisV /></button>
            </div>
            <hr />
            <form>
                <div className="form-group mb-4">
                    <label htmlFor="assignmentName">Assignment Name</label>
                    <input type="text" className="form-control" id="assignmentName" defaultValue={assignment?.title} onChange={(e) =>
                        dispatch(setAssignment({ ...assignment, title: e.target.value }))
                    } />
                </div>
                <div className="form-group mb-4">
                    <textarea className="form-control" id="inputTextarea" rows={4} defaultValue={assignment.desc} onChange={(e) =>
                        dispatch(setAssignment({ ...assignment, desc: e.target.value }))
                    }></textarea>
                </div>

                <div className="form-group row mb-4">
                    <label htmlFor="inputPoints" className="col-sm-2 col-form-label text-sm-end">Points</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputPoints" placeholder="Enter Points" defaultValue={assignment.points} onChange={(e) =>
                        dispatch(setAssignment({ ...assignment, points: e.target.value }))
                    } />
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label htmlFor="inputAssignmentGroup" className="col-sm-2 col-form-label text-sm-end">Assignment Group</label>
                    <div className="col-sm-10">
                        <select id="inputAssignmentGroup" className="form-control">
                            <option selected>ASSIGNMENTS</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label htmlFor="inputDisplayGradeAs" className="col-sm-2 col-form-label text-sm-end">Display grade as</label>
                    <div className="col-sm-10">
                        <select id="inputDisplayGradeAs" className="form-control">
                            <option selected>Percentage</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row mb-4">
                    <div className="col-sm-2"> </div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="inputChk" />
                            <label className="form-check-label" htmlFor="inputChk">
                                Do not count this assignment towards final grade
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-4">
                    <label htmlFor="inputAssign" className="col-sm-2 col-form-label text-sm-end">Assign</label>
                    <div className="col-sm-10">
                        <form className="wd-form-border" style={{ width: '60%' }}>
                            <div className="form-group">
                                <label htmlFor="inputAssignTo"><b>Assign to</b></label>
                                <input type="text" className="form-control" id="inputAssignTo" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="wd-due-date">Due</label><br />
                                <input type="date" className="form-control" id="wd-due-date" defaultValue={assignment.due_date} onChange={(e) =>
                        dispatch(setAssignment({ ...assignment, due_date: e.target.value }))
                    }/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="wd-available-from">Available from</label><br />
                                    <input type="date" className="form-control" id="wd-available-from" value="2021-01-01" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="wd-available-until">Until</label><br />
                                    <input type="date" className="form-control" id="wd-available-until" value="2021-01-01" />
                                </div>
                            </div>
                            <button className="wd-assignment-btn-width" type="button">+ Add</button>
                        </form>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-10">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Notify users that this content has changed
                        </label>
                    </div>
                </div>
                <div className="col-2 float-end">
                    <button><Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="wd-assignment-editor-btn">Cancel</Link></button>
                    <button onClick={handleSave} className="wd-assignments-edit-bg-red wd-assignments-edit-txt-white">Save</button>
                </div>
            </div>
        </div>
    );
}
export default AssignmentEditor;