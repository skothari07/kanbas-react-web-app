import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

function ModulesButtons() {
    return (
        <>
            <div className="d-flex justify-content-end">
                <button className="btn btn-warning">Collapse All</button>
                <button className="btn btn-primary">View Progress</button>
                <span>
                    <FaCheckCircle className="text-success" />
                    <select>
                        <option>Publish All</option>
                        <option>Unpublish All</option>
                    </select>
                </span>
                <button className="btn btn-danger">+ Module</button>
                <button className="btn btn-secondary"><BsThreeDotsVertical /></button>
            </div>
            <hr />
        </>
    );
}

export default ModulesButtons;