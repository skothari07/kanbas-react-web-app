import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { TbLetterN } from "react-icons/tb";
import { IoMdTime, IoMdHelpCircleOutline } from "react-icons/io";
import { TiPowerOutline } from "react-icons/ti";

function KanbasNavigation() {
    const links = [
        {label: " ", icon: <TbLetterN className="fs-2"/>},
        { label: "Account", icon: <FaRegUserCircle  /> },
        { label: "Dashboard", icon: <FaTachometerAlt  /> },
        { label: "Courses", icon: <FaBook  /> },
        { label: "Calendar", icon: <FaRegCalendarAlt  /> },
        { label: "Inbox", icon: <FaInbox  />},
        { label: "History", icon: <IoMdTime />},
        { label: "Studio", icon: <CiYoutube />},
        {label: "Commons", icon: <TiPowerOutline style = {{transform: 'rotate(90deg)' }}/>},
        {label: "Help", icon: <IoMdHelpCircleOutline />},
    ];
    const { pathname } = useLocation();

    return (
        <ul className="wd-kanbas-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> {link.icon} <br /> {link.label} </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;