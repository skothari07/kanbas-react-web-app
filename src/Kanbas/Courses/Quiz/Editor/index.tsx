import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import "./index.css";
import {
    addQuiz,
    updateQuiz,
} from "../reducer";
import { KanbasState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../client";



function QuizEditor() {
    const { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddQuiz = () => {
        client.createQuiz(courseId, quiz).then((quiz: any) => {
            dispatch(addQuiz(quiz));
        });
    };

    const handleUpdateQuiz = async () => {
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
    };
    
    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);
    
    let currQuiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    
    if(typeof quizId !== 'undefined'){
    currQuiz = quizList.find(
        (quiz) => quiz._id === quizId);
    }
    
    const [quiz, setQuizDetails] = useState(currQuiz);

    const handleSave = () => {
        if (quizId === undefined) {
            handleAddQuiz();
        } else {
            handleUpdateQuiz();
        }
        navigate(`/Kanbas/Courses/${courseId}/Quiz`);
    };

    return (
        <div>
            <div className="d-flex justify-content-end">
                <span className="wd-quiz-published"><FaCheckCircle className="text-success" /> Published</span>
                <button><FaEllipsisV /></button>
            </div>
            <hr />
            <form>
                <div className="form-group mb-4">
                    <label htmlFor="quizName">Quiz Name</label>
                    <input type="text" className="form-control" id="quizName" defaultValue={quiz?.title} onChange={(e) => setQuizDetails({...quiz, title: e.target.value})
                    } />
                </div>
                <div className="form-group mb-4">
                    <textarea className="form-control" id="inputTextarea" rows={4} defaultValue={quiz.desc} onChange={(e) =>
                        setQuizDetails({ ...quiz, desc: e.target.value })
                    }></textarea>
                </div>

                <div className="form-group row mb-4">
                    <label htmlFor="inputPoints" className="col-sm-2 col-form-label text-sm-end">Points</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputPoints" placeholder="Enter Points" defaultValue={quiz.points} onChange={(e) =>
                        setQuizDetails({ ...quiz, points: e.target.value })
                    } />
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label htmlFor="inputQuizGroup" className="col-sm-2 col-form-label text-sm-end">Quiz Group</label>
                    <div className="col-sm-10">
                        <select id="inputQuizGroup" className="form-control">
                            <option selected>QUIZZES</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row mb-4">
                    <label htmlFor="inputDisplayGradeAs" className="col-sm-2 col-form-label text-sm-end">Display grade as</label>
                    <div className="col-sm-10">
                        <select id="inputDisplayGradeAs" className="form-control">
                            <option selected>Percentage</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row mb-4">
                    <div className="col-sm-2"> </div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="inputChk" />
                            <label className="form-check-label" htmlFor="inputChk">
                                Do not count this quiz towards final grade
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-4">
                    <label htmlFor="inputAssign" className="col-sm-2 col-form-label text-sm-end">Assign</label>
                    <div className="col-sm-10">
                        <form className="wd-form-border" style={{ width: '60%' }}>
                            <div className="form-group">
                                <label htmlFor="inputAssignTo"><b>Assign to</b></label>
                                <input type="text" className="form-control" id="inputAssignTo" placeholder="John Doe" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="wd-due-date">Due</label><br />
                                <input type="date" className="form-control" id="wd-due-date" defaultValue={quiz.due_date} onChange={(e) =>
                        setQuizDetails({ ...quiz, due_date: e.target.value })
                    }/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="wd-available-from">Available from</label><br />
                                    <input type="date" className="form-control" id="wd-available-from" value="2021-01-01" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="wd-available-until">Until</label><br />
                                    <input type="date" className="form-control" id="wd-available-until" value="2021-01-01" />
                                </div>
                            </div>
                            <button className="wd-quiz-btn-width" type="button">+ Add</button>
                        </form>
                    </div>
                </div>
            </form>
            <hr />
            <div className="row">
                <div className="col-10">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Notify users that this content has changed
                        </label>
                    </div>
                </div>
                <div className="col-2 float-end">
                    <button><Link to={`/Kanbas/Courses/${courseId}/Quiz`} className="wd-quiz-editor-btn">Cancel</Link></button>
                    <button onClick={() => handleSave()} className="wd-quiz-edit-bg-red wd-quiz-edit-txt-white">Save</button>
                </div>
            </div>
        </div>
    );
}
export default QuizEditor;