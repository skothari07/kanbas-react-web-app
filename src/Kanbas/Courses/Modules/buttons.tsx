import { FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../../../auth/AuthContext";

function ModulesButtons() {
    const { user } = useAuth();
    return (
        <>
            <div className="d-flex justify-content-end">
                <button className="btn btn-secondary">Collapse All</button>
                <button className="btn btn-primary">View Progress</button>
                {(user?.role === 'FACULTY'|| user?.role === 'ADMIN') && (<>
                <span>
                    <FaCheckCircle className="text-success" />
                    <select className="btn btn-success dropdown-toggle">
                        <option>Publish All</option>
                        <option>Unpublish All</option>
                    </select>
                </span>
                    <button className="btn btn-danger">+ Module</button>
                    </>)}
                <button className="btn btn-secondary"><BsThreeDotsVertical /></button>
            </div>
            <hr />
        </>
    );
}

export default ModulesButtons;