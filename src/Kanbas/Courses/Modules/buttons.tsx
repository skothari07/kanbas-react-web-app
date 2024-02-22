import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

function ModulesButtons() {
    return (
        <>
            <div className="d-flex justify-content-end">
                <button className="wd-modules-bg-light-gray">Collapse All</button>
                <button className="wd-modules-bg-light-gray">View Progress</button>
                <span>
                    <FaCheckCircle className="text-success" />
                    <select>
                        <option>Publish All</option>
                        <option>Unpublish All</option>
                    </select>
                </span>
                <button className="wd-modules-bg-red">+ Module</button>
                <button className="wd-modules-bg-light-gray"><BsThreeDotsVertical /></button>
            </div>
            <hr />
        </>
    );
}

export default ModulesButtons;