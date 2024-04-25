import React, { useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import * as client from "../client";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { setQuizzes, updateQuiz } from "../reducer";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

function FormGroup({ id, label, value }: { id: string, label: string, value: string }) {
    return (
        <div className="form-group row mb-1">
            <label htmlFor={id} className="col-sm-4 col-form-label text-sm-end"><b>{label}</b></label>
            <div className="col-sm-8">
                <input type="text" className="form-control border-0" id={id} value={value} readOnly />
            </div>
        </div>
    );
}

function QuizDetails() { 
    const { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);

    let currQuiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    
    if(typeof quizId !== 'undefined'){
    currQuiz = quizList.find(
        (quiz) => quiz.qid === quizId);
    }

    const [quiz, setQuizDetails] = useState<any>(currQuiz);

    const handlePublishQuiz = (publish: boolean) => {
        client.updateQuiz({ ...quiz, isPublished: publish }).then((status) => {
            dispatch(updateQuiz({ ...quiz, isPublished: publish }));  
            setQuizDetails({ ...quiz, isPublished: publish });
        });
    };
    

    const handleEditQuiz = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/edit/${quizId}`);
    }

    const handlePreviewQuiz = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/preview/${quizId}`);
    }

    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId, quizId]);
    
    return (
        <>
            <div className="d-flex justify-content-end">
                <span>
                    <button className={quiz.isPublished ? "btn btn-success" : "btn btn-secondary"} onClick={() => handlePublishQuiz(!quiz.isPublished)}>{quiz.isPublished ? (<><FaCheckCircle />Published</>) : (<><FaBan />Unpublished</>)}</button>
                </span>
                <button className="btn btn-primary" onClick={() => handlePreviewQuiz()}>Preview</button>
                <span>
                    <button className="btn btn-secondary" onClick={() => handleEditQuiz()}><BsPencilSquare />Edit</button>
                </span>
                <button className="btn btn-secondary"><BsThreeDotsVertical /></button>
            </div>
            <hr />
            <h3>{quiz.title}</h3>
            <FormGroup id="quizType" label="Quiz Type" value={quiz.quiz_type} />
            <FormGroup id="inputPoints" label="Points" value={quiz.points} />
            <FormGroup id="assgnGroup" label="Assignment Group" value={quiz.assignment_group} />
            <FormGroup id="shuffleAns" label="Shuffle Answers" value={quiz.shuffle_answers ? "Yes" : "No"} />
            <FormGroup id="timeLimit" label="Time Limit" value={quiz.time_limit} />
            <FormGroup id="multipleAttempts" label="Multiple Attempts" value={quiz.multiple_attempts ? "Yes" : "No"} />
            <FormGroup id="viewResponses" label="View Responses" value={"Always"} />
            <FormGroup id="showAns" label="Show Correct Answers" value={quiz.show_correct_answers ? "Yes" : "No"} />
            <FormGroup id="oneQuestion" label="One Question at a time" value={quiz.one_question ? "Yes" : "No"} />
            <FormGroup id="requireLockdown" label="Require Respondus Browser Lockdown" value={"No"} />
            <FormGroup id="viewQuizResults" label="Required to view quiz results" value={"No"} />
            <FormGroup id="webcam" label="Webcam Required" value={quiz.webcam_required ? "Yes" : "No"} />
            <FormGroup id="lockQuestions" label="Lock Questions After Answering" value={quiz.lock_questions ? "Yes" : "No"} />
            <br/>
            <table className="table">
                <thead>
                    <tr>
                        <th>Due</th>
                        <th>For</th>
                        <th>Available From</th>
                        <th>Available Until</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{new Date(quiz.due_date).toDateString() }</td>
                        <td>Everyone</td>
                        <td>{new Date(quiz.available).toDateString() }</td>
                        <td>{new Date(quiz.until_date).toDateString() }</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default QuizDetails;
