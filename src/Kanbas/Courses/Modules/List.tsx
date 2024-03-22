import React, { useState } from "react";
import "./index.css";
//import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./reducer";
import { KanbasState } from "../../store";


interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
};  

function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    const [selectedModule, setSelectedModule] = useState<any>(null);

    return (
        <>
            {/* <!-- Add buttons here --> */}
            <input value={module.name} onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))}/> <br/><br/>
            <textarea value={module.description} onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))} /><br/>
            <button onClick={() => dispatch(addModule({ ...module, course: courseId }))} className="btn btn-success">Add</button>
            <button onClick={() => dispatch(updateModule(module))} className="btn btn-warning">Update</button>
            <ul className="list-group wd-modules">
                {moduleList.filter((module) => module.course === courseId).map((module, index) => (
                    <li
                        key={index}
                        className="list-group-item"
                        onClick={() => setSelectedModule(module)}
                    >
                        <div>
                            <FaEllipsisV className="me-2" />
                            {module.name}
                            <span className="float-end">
                                <FaCheckCircle className="text-success" />
                                <FaPlusCircle className="ms-2" />
                                <FaEllipsisV className="ms-2" />
                            </span>
                            <span className="float-end">
                            <button onClick={() => dispatch(setModule(module))} className="btn btn-warning">Edit</button>
                            <button onClick={() => dispatch(deleteModule(module._id))} className="btn btn-danger">Delete</button>
                        </span>
                        </div>
                        {selectedModule && selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson : Lesson) => (
                                    <li className="list-group-item">
                                        <FaEllipsisV className="me-2" />
                                        {lesson.name}
                                        <span className="float-end">
                                            <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}
export default ModuleList;