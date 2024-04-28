import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";
import * as client from "../client";

function QuizPreview() {

    const { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    
    const currQuiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);

    const questionList = useSelector((state: KanbasState) => state.quizzesReducer.questions);

    const [quiz, setQuizDetails] = useState<any>(currQuiz || {});
    const [questionsList, setQuestionsList] = useState(questionList);

    const getQuestion = async (qz: any) => {
        const questionPromises = qz.questions.map(async (q: any) => {
            const response = await client.findQuestionById(q);
            return response[0];
        });
        const questions = await Promise.all(questionPromises);
        setQuestionsList(questions)
    }
    const handleQuestionCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quiz/${quizId}`);
    }

    useEffect(() => {
        client.findQuizById(quizId)
            .then((q) => {
                setQuizDetails({ ...q[0] });
                getQuestion(q[0]);}
        );
    }, [quizId]);

    console.log(questionsList)
    return (
        <>
            {quiz && <h1>{quiz.title}</h1>}
            {quiz && questionsList.map((question: any) => (
                <div key={question.questionId} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title" style={{ backgroundColor: 'gray' }}>{question.title} ({question.points} points)</h5>
                        <hr />
                        <p className="card-text">{question.description}</p>
                        {question.question_type === "Fill in the blanks" && (
                            <div>
                                {question.blanks.map((blank: string, index: number) => (
                                    <input
                                        key={index}
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder={`Enter your answer for blank ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                        {question.question_type === "Multiple Choice" && (
                            <div>
                                {question.options.map((option: any, index: number) => (
                                    <div key={index} className="form-check">
                                        <input type="radio" id={`option_${index}`} name={`question_${question.questionId}`} className="form-check-input" />
                                        <label htmlFor={`option_${index}`} className="form-check-label">{option}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                        {question.question_type === "True False" && (
                            <div>
                                <div className="form-check">
                                    <input type="radio" id={`true_${question.questionId}`} name={`question_${question.questionId}`} className="form-check-input" />
                                    <label htmlFor={`true_${question.questionId}`} className="form-check-label">True</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" id={`false_${question.questionId}`} name={`question_${question.questionId}`} className="form-check-input" />
                                    <label htmlFor={`false_${question.questionId}`} className="form-check-label">False</label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <button className="btn btn-secondary" onClick={() => handleQuestionCancel()}>Cancel</button>
            <button className="btn btn-danger">Save</button>
        </>
    );
}

export default QuizPreview;