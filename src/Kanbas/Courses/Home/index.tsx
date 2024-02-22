import Modules from "../Modules";
import Status from "./Status";
import "./index.css";

function Home() {
    return (
        <div className="d-flex">
            <div className="flex-fill">
                <Modules />
            </div>
            <div className="flex-grow-0 wd-status" style={{"width": "250px"}}>
                <Status />
            </div>
        </div>
    );
}
export default Home;