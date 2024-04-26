import React, { useEffect, useState} from "react";
import { FaCheckCircle, FaEllipsisV, FaBan, FaCaretDown } from "react-icons/fa";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import './index.css';
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { updateQuiz, deleteQuiz, setQuizzes } from "./reducer";
import * as client from "./client";
import { useAuth } from "../../../auth/AuthContext";

function Quizzes() {
    const { courseId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean[]>(Array(quizList.length).fill(false));
    
    const handleToggleMenu = (index: any) => {
        const newIsMenuOpen = [...isMenuOpen];
        newIsMenuOpen[index] = !newIsMenuOpen[index];
        setIsMenuOpen(newIsMenuOpen);
    };

    const handleDeleteQuiz = async (quizId: any) => {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    };
    const handleEditQuiz = async (quiz: any) => {
        navigate(`/Kanbas/Courses/${courseId}/Quiz/${quiz.qid}`);
    };

    const handlePublishQuiz = (quiz: any, publish: boolean) => {
        client.updateQuiz({...quiz, isPublished: publish}).then((status) => {
            dispatch(updateQuiz({...quiz, isPublished: publish}));
        });
    };

    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);
    
    function getAvailabilityStatus(quiz: any) {
        const currentDate = new Date();
        const availableDate = new Date(quiz.available_date);
        const availableUntilDate = new Date(quiz.until_date);
    
        if (currentDate > availableUntilDate) {
            return "Closed";
        } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
            return "Available";
        } else {
            return `Not available until ${availableDate.toDateString()}`;
        }
    }
    
    const dispatch = useDispatch();
    return (
        <>
            <div className="row justify-content-between">
                <div className="col-auto search-quiz">
                    <input type="text" className="form-control" placeholder="Search for Quiz" />
                </div>
                <div className="col-auto">
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/create`} className="wd-quiz-title"><button className="wd-quiz-bg-red" disabled={user?.role === "STUDENT"}>+ Quiz</button></Link>
                    <button><FaEllipsisV /></button>
                </div>
            </div>
            <hr />
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaEllipsisV className="me-2" /><FaCaretDown /><b>Assignment Quizzes</b>
                    </div>
                    <ul className="list-group">
                        {quizList.filter((quiz) => quiz.course === courseId).map((quiz, index) => (
                            <li className="list-group-item" key={quiz.qid}>
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <FaEllipsisV className="me-2" />
                                        <MdOutlineRocketLaunch />
                                    </div>
                                    <div className="col wd-quiz-details">
                                        <p className="mb-1">{user?.role === "STUDENT" && new Date(quiz.due_date) < new Date() ? (
                                            <span className="wd-quiz-title">
                                                {quiz.title}
                                            </span>
                                        ) : (
                                            <Link to={`/Kanbas/Courses/${courseId}/Quiz/${quiz.qid}`} className="wd-quiz-title">
                                                    {quiz.title}
                                            </Link>
                                        )}</p>
                                        <p className="mb-0 wd-quiz-text-xs text-muted">{quiz.desc}</p>
                                        <p className="mb-0 wd-quiz-text-xs text-muted"><b>{getAvailabilityStatus(quiz)}</b> | <b>Due:</b> {new Date(quiz.due_date).toDateString()} | <b>Points:</b> {quiz.points} | {quiz.questions?.length ?? 0} Questions</p>
                                    </div>
                                    <div className="col-auto">
                                        <span>
                                            {(user?.role === "FACULTY" || user?.role === "ADMIN") && (<>{(quiz.isPublished) ? (<FaCheckCircle className="text-success" />) : (<FaBan />)}</>)}
                                            
                                            {(user?.role === "FACULTY" || user?.role === "ADMIN") && (<>
                                                <FaEllipsisV className="ms-2" onClick={() => handleToggleMenu(index)} />
                                                {isMenuOpen[index] && (
                                                    <div className="col-auto dropdown-menu show">
                                                        <button className="dropdown-item" onClick={() => handleEditQuiz(quiz)}>Edit</button>
                                                        <button className="dropdown-item" onClick={() => handleDeleteQuiz(quiz.qid)}>Delete</button>
                                                        <button className="dropdown-item" onClick={() => handlePublishQuiz(quiz, !quiz.isPublished)}>{quiz.isPublished ? "Unpublish": "Publish" }</button>
                                                    </div>
                                                )}
                                            </>)}
                                            {(user?.role === "STUDENT") && (<><FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></>)}
                                        </span>
                                    </div>
                                </div>
                            </li>))}
                    </ul>
                </li>
            </ul>
        </>
    );
}
export default Quizzes;