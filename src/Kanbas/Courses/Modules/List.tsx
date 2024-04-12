import React, { useState, useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";
import { useAuth } from "../../../auth/AuthContext";


interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
};  

function ModuleList() {
    const { courseId } = useParams();
    const { user } = useAuth();

    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };

    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };

    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };

    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    const [selectedModule, setSelectedModule] = useState<any>(null);

    return (
        <>
            {(user?.role === "FACULTY" || user?.role === "ADMIN") && (<>
                <input value={module.name} onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))} /> <br /><br />
                <textarea value={module.description} onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))} /><br />
                <button onClick={handleAddModule} className="btn btn-success">Add</button>
                <button onClick={handleUpdateModule} className="btn btn-warning">Update</button>
            </>)}
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
                            {(user?.role === "FACULTY" || user?.role === "ADMIN") && (<span className="float-end">
                                <button onClick={() => dispatch(setModule(module))} className="btn btn-warning">Edit</button>
                                <button onClick={() => handleDeleteModule(module._id)} className="btn btn-danger">Delete</button>
                            </span>)}
                        </div>
                        {selectedModule && selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson: Lesson) => (
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