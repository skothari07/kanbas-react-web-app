import React, { useState } from "react";
function WorkingWithObjects() {

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

    const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment";

    const MODULE_URL = "http://localhost:4000/a5/module";

    return (
        <div>
            <h3>Working With Objects</h3>
            <h4>On Your Own: Module</h4>
            <a className="btn btn-primary" href="http://localhost:4000/a5/module">
                Get Module
            </a><br /><br />
            <a className="btn btn-primary" href="http://localhost:4000/a5/module/name">
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
            <a href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                Update Score
            </a> <br /><br />
            <input type="text"
                onChange={(e) => setAssignment({
                    ...assignment,
                    title: e.target.value
                })}
                value={assignment.title} />
            <a href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a><br /><br />
            <h4>Retrieving Objects</h4>
            <a className="btn btn-primary" href="http://localhost:4000/a5/assignment">
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a className="btn btn-primary" href="http://localhost:4000/a5/assignment/title">
                Get Title
            </a>
            
        </div>
    );
}
export default WorkingWithObjects;