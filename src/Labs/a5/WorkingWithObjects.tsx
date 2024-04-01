import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
    const API_BASE = process.env.REACT_APP_API_BASE;

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });

    const [module, setModule] = useState({
        id: 1, name: "NodeJS Module",
        description: "Create a NodeJS server with ExpressJS",
        course: "CS5610",
    });

    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;

    const MODULE_URL = `${API_BASE}/a5/module`;

    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div>
            <h3>Working With Objects</h3>
            <h4>On Your Own: Module</h4>
            <a className="btn btn-primary" href={`${API_BASE}/a5/module`}>
                Get Module
            </a><br /><br />
            <a className="btn btn-primary" href={`${API_BASE}/a5/module/name`}>
                Get Module Name
            </a><br /><br />
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    name: e.target.value
                })}
                value={module.name} />
            <a href={`${MODULE_URL}/name/${module.name}`}>
                Update Module Name
            </a><br /><br />
            <input type="text"
                onChange={(e) => setModule({
                    ...module,
                    description: e.target.value
                })}
                value={module.description} />
            <a href={`${MODULE_URL}/description/${module.description}`}>
                Update Module Description
            </a><br />
            <h4>Modifying Properties</h4>
            <input type="number"
                onChange={(e) => setAssignment({
                    ...assignment,
                    score: parseInt(e.target.value)
                })}
                value={assignment.score} />
            <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                Update Score
            </a> <br /><br />
            <input type="checkbox"
                onChange={(e) => setAssignment({
                    ...assignment,
                    completed: e.target.checked
                })}
                checked={assignment.completed} />
            <a href={`${ASSIGNMENT_URL}/score/${assignment.completed}`}>
                Update Completed
            </a> <br /><br />
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />
            <button onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button><br /><br />
            <button onClick={fetchAssignment} >
                Fetch Assignment
            </button><br/><br/>
            <h4>Retrieving Objects</h4>
            <a className="btn btn-primary" href={`${API_BASE}/a5/assignment`}>
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a className="btn btn-primary" href={`${API_BASE}/a5/assignment/title`}>
                Get Title
            </a>
            
        </div>
    );
}
export default WorkingWithObjects;