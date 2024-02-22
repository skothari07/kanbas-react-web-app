import { FaFileImport } from "react-icons/fa6";
import { BiTargetLock } from "react-icons/bi";
import { TiPowerOutline } from "react-icons/ti";
import { SiSimpleanalytics } from "react-icons/si";
import { GrAnnounce } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";

function Status() {

    return (
        <>
            <ul className="list-group wd-modules-course-status">
                <li className="list-group-item wd-modules-course-status-list-item"><FaFileImport /> Import Existing content </li>
                <li className="list-group-item wd-modules-course-status-list-item"><TiPowerOutline style = {{transform: 'rotate(90deg)' }}/> Import From Commons</li>
                <li className="list-group-item wd-modules-course-status-list-item"><BiTargetLock /> Choose Home Page</li>
                <li className="list-group-item wd-modules-course-status-list-item"><SiSimpleanalytics /> View Course Stream</li>
                <li className="list-group-item wd-modules-course-status-list-item"><GrAnnounce /> New Announcement</li>
                <li className="list-group-item wd-modules-course-status-list-item"><SiSimpleanalytics /> New Analytics</li>
                <li className="list-group-item wd-modules-course-status-list-item"><IoIosNotificationsOutline /> View Course Notifications</li>
            </ul>
            <br />
            <h6>To Do</h6>
            <hr />
            <ul className="list-group">
                <li className="list-group-item"><p className="wd-to-do-text">Grade A1 - HTML + ENV</p><p className="wd-to-do-sub-text">Due Sep 18, 2022 at 11:59pm | 100 pts</p></li>
                <li className="list-group-item"><p className="wd-to-do-text">Grade A2 - CSS + BOOTSTRAP</p><p className="wd-to-do-sub-text">Due Sep 18, 2022 at 11:59pm | 100 pts</p></li>
            </ul>
        </>
    );
}

export default Status;