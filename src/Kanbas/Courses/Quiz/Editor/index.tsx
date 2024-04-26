import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { setQuizzes, updateQuiz, addQuiz, setQuestions } from "../reducer";
import { FaBan, FaCheckCircle, FaPlus, FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Tabs, Tab } from "react-bootstrap";
import Editor from 'react-simple-wysiwyg';



function QuizEditor() {
    const { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quizList = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes);

    let currQuiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    
    const question = useSelector((state: KanbasState) =>
        state.quizzesReducer.question);

    const qList = useSelector((state: KanbasState) => state.quizzesReducer.questions);

    if(typeof quizId !== 'undefined'){
        currQuiz = quizList.find((quiz) => quiz.qid === quizId);
    }


    const [quiz, setQuizDetails] = useState<any>(currQuiz);
    const [isQEditor, setQEditor] = useState(false);
    const [selectedType, setSelectedType] = useState('Multiple Choice');
    const [currQuestion, setcurrQuestion] = useState(question);
    const [newQuestionList, setNewQuestionList] = useState<any>([]);
    const [choices, setChoices] = useState<string[]>(['', '', '', '']);
    const [inputsFB, setInputsFB] = useState<string[]>([]);
    const [questionsList, setQuestionsList] = useState(qList);
    const [qIds, setQIds] = useState(currQuiz.questions);
    
    const addInputFieldFB = () => {
        setInputsFB([...inputsFB, '']);
    };
    
    const handleInputChange = (index: any, value: any) => {
        const updatedInputs = [...inputsFB];
        updatedInputs[index] = value;
        setInputsFB(updatedInputs);
      };

    const handleChoicesChange = (index: any, event: any) => {
        const newChoices = [...choices];
        newChoices[index] = event.target.value;
        setChoices(newChoices);
      };
    

    //TODO: Update logic
    const calculatePoints = (currQ: any) => {
        let points = 0;
        currQ.map((question: any) => {
            points += question.points;
        });
        return points;
    }
    //TODO: API post questions along with quiz
    const handleAddQuiz = async (isPublished: any) => {
        const newQuiz = { ...quiz, isPublished: isPublished, points: calculatePoints([...questionsList, ...newQuestionList ])};
        if (isPublished) {
            const questionPromises = newQuestionList.map(async (q: any) => {
                const response = await client.createQuestion(q);
                return response.questionId;
            });
    
            const questionIds = await Promise.all(questionPromises);
            client.createQuiz(courseId, { ...newQuiz, questions: [...qIds, ...questionIds] }).then(() => {
                dispatch(addQuiz(newQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
            });
        } else {
            const questionPromises = newQuestionList.map(async (q: any) => {
                const response = await client.createQuestion(q);
                return response.questionId;
            });
    
            const questionIds = await Promise.all(questionPromises);
            client.createQuiz(courseId, { ...newQuiz, questions: [...qIds, ...questionIds] }).then((response: any) => {
                dispatch(addQuiz(newQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quiz/${response.qid}`);
            });
        }
    };

    
    const handleUpdateQuiz = async (isPublished: any) => {
        const updatedQuiz = { ...quiz, isPublished: isPublished, points: calculatePoints([...questionsList, ...newQuestionList ])};
        if (isPublished) {
            const questionPromises = newQuestionList.map(async (q: any) => {
                const response = await client.createQuestion(q);
                return response.questionId;
            });
    
            const questionIds = await Promise.all(questionPromises);
            client.updateQuiz({...updatedQuiz, questions: [...qIds, ...questionIds] }).then(() => {
                dispatch(updateQuiz(updateQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/`);
            });
        } else {
            const questionPromises = newQuestionList.map(async (q: any) => {
                const response = await client.createQuestion(q);
                return response.questionId;
            });
    
            const questionIds = await Promise.all(questionPromises);
            client.updateQuiz({...updatedQuiz, questions: [...qIds, ...questionIds] }).then((response) => {
                dispatch(updateQuiz(updatedQuiz));
                navigate(`/Kanbas/Courses/${courseId}/Quiz/${quizId}}`);
            });
        }
    };

    const handleSave = (isPublished: Boolean) => {
        if (typeof quizId === 'undefined') {
            handleAddQuiz(isPublished);
        } else {
            handleUpdateQuiz(isPublished);
        }
    }

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }

    const handleNewQuestion = () => {
        if (isQEditor) {
            setQEditor(!isQEditor);
            setcurrQuestion(question);
        } else {
            setQEditor(!isQEditor);
        } 
    }

    const handleOnChangeSelectedType = (currType: any) => {
        setSelectedType(currType);
        setcurrQuestion({ ...question, question_type: currType });
        if (currType === 'True False') {
            setChoices(['True', 'False']);
        }
    }

    const handleQuestionCancel = () => {
        setcurrQuestion(question);
        setNewQuestionList(qList);
        setChoices(['', '', '', '']);
        setInputsFB([]);
        setQEditor(!isQEditor);
    }

    const handleQuestionSave = () => {
        const currQ = { ...currQuestion, options: choices, blanks: inputsFB }
        setNewQuestionList([...newQuestionList , currQ]);
        setcurrQuestion(question);
        setChoices(['', '', '', '']);
        setInputsFB([]);
    }

    useEffect(() => {
        client.findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
        );
        client.findQuestionsByQuiz(quizId)
            .then((q) =>
                dispatch(setQuestions(q))
        );
    }, [courseId]); 

    return (
        <>
            <div className="d-flex justify-content-end">
                <span>
                    <b>Points:</b> {quiz.points} &nbsp; &nbsp;
                </span>
                <span>
                    {quiz.isPublished ? (<><FaCheckCircle style={{ color: "green" }} />  Published</>) : (<><FaBan />  Unpublished</>)} &nbsp;
                </span>
                <span>
                    <BsThreeDotsVertical />&nbsp;
                </span>
            </div>
            <hr />
            <br />
            <Tabs defaultActiveKey="details">
                <Tab eventKey="details" title="Details">
                    <div>
                        <div className="form-group mb-4">
                            <label htmlFor="quizName">Quiz Title</label>
                            <input type="text" className="form-control" id="quizName" defaultValue={quiz?.title} onChange={(e) => setQuizDetails({ ...quiz, title: e.target.value })} />
                        </div>
                        <p>Quiz Instructions:</p>
                        <Editor id="quizDesc" value={quiz?.desc} onChange={(e) => setQuizDetails({ ...quiz, desc: e.target.value })} />
                        <br />
                        <div className="form-group row mb-4">
                            <label htmlFor="inputQuizType" className="col-sm-2 col-form-label text-sm-end">Quiz Type</label>
                            <div className="col-sm-10">
                                <select id="inputQuizType" className="form-control" onChange={(e) => setQuizDetails({ ...quiz, quiz_type: e.target.value })}>
                                    <option value="Graded Quiz" selected>Graded Quiz</option>
                                    <option value="Practice Quiz">Practice Quiz</option>
                                    <option value="Graded Survey">Graded Survey</option>
                                    <option value="Ungraded Survey">Ungraded Survey</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label htmlFor="assgnGroup" className="col-sm-2 col-form-label text-sm-end">Assignment Group</label>
                            <div className="col-sm-10">
                                <select id="assgnGroup" className="form-control" onChange={(e) => setQuizDetails({ ...quiz, assignment_group: e.target.value })}>
                                    <option value="Quizzes" selected>Quizzes</option>
                                    <option value="Exams">Exams</option>
                                    <option value="Assignments">Assignments</option>
                                    <option value="Project">Project</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label htmlFor="accessCode" className="col-sm-2 col-form-label text-sm-end">Access Code</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="accessCode" defaultValue={quiz?.access_code} onChange={(e) => setQuizDetails({ ...quiz, access_code: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <div className="col-sm-2"> </div>
                            <div className="col-sm-10">
                                <b>Options</b>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="shuffleAns" onChange={(e) => setQuizDetails({ ...quiz, shuffle_answers: e.target.checked })} defaultChecked={quiz.shuffle_answers} />
                                    <label className="form-check-label" htmlFor="shuffleAns">
                                        Shuffle Answers
                                    </label>
                                </div>
                                <br />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="timeLimitChbk" onChange={(e) => setQuizDetails({ ...quiz, isTimeLimit: e.target.checked })} defaultChecked={quiz.isTimeLimit} />
                                    <label className="form-check-label" htmlFor="timeLimitChbk">
                                        Time Limit
                                    </label>
                                    <input type="number" placeholder="Time in Minutes" className="form-control" id="timeLimit" defaultValue={quiz?.time_limit} onChange={(e) => setQuizDetails({ ...quiz, time_limit: e.target.value })} />
                                </div>
                                <br />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="multipleAttempts" onChange={(e) => setQuizDetails({ ...quiz, multiple_attempts: e.target.checked })} defaultChecked={quiz.multiple_attempts} />
                                    <label className="form-check-label" htmlFor="multipleAttempts">
                                        Allow Multiple Attempts
                                    </label>
                                </div>
                                <br />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="showAnswers" onChange={(e) => setQuizDetails({ ...quiz, show_correct_answers: e.target.checked })} defaultChecked={quiz.show_correct_answers} />
                                    <label className="form-check-label" htmlFor="showAnswers">
                                        Show Correct Answers
                                    </label>
                                </div>
                                <br />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="oneQuestion" onChange={(e) => setQuizDetails({ ...quiz, one_question: e.target.checked })} defaultChecked={quiz.one_question} />
                                    <label className="form-check-label" htmlFor="oneQuestion">
                                        One Question at a Time
                                    </label>
                                </div>
                                <br />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="isWebcam" onChange={(e) => setQuizDetails({ ...quiz, webcam_required: e.target.checked })} defaultChecked={quiz.webcam_required} />
                                    <label className="form-check-label" htmlFor="isWebcam">
                                        Webcam Required
                                    </label>
                                </div>
                                <br />
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="lockQuestions" onChange={(e) => setQuizDetails({ ...quiz, lock_questions: e.target.checked })} defaultChecked={quiz.lock_questions} />
                                    <label className="form-check-label" htmlFor="lockQuestions">
                                        Lock Questions After Answering
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row mb-4">
                            <label htmlFor="inputAssign" className="col-sm-2 col-form-label text-sm-end">Assign</label>
                            <div className="col-sm-10">
                                <form className="wd-form-border" style={{ width: '55%', padding: '15px' }}>
                                    <div className="form-group">
                                        <label htmlFor="inputAssignTo"><b>Assign to</b></label>
                                        <input type="text" className="form-control" id="inputAssignTo" placeholder="John Doe" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="wd-due-date" >Due</label><br />
                                        <input type="date" className="form-control" id="wd-due-date" defaultValue={quiz.due_date} onChange={(e) =>
                                            setQuizDetails({ ...quiz, due_date: e.target.value })} />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="wd-available-from">Available from</label><br />
                                            <input type="date" className="form-control" id="wd-available-from" defaultValue={quiz.available} onChange={(e) =>
                                                setQuizDetails({ ...quiz, available: e.target.value })} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="wd-available-until">Until</label><br />
                                            <input type="date" className="form-control" id="wd-available-until" defaultValue={quiz.until_date} onChange={(e) =>
                                                setQuizDetails({ ...quiz, until_date: e.target.value })} />
                                        </div>
                                    </div>
                                    <button className="wd-quiz-btn-width" type="button">+ Add</button>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </Tab>
                <Tab eventKey="questions" title="Questions">
                    <div>
                        {isQEditor && <>
                            <select id="questionType" className="form-control" onChange={(e) => handleOnChangeSelectedType(e.target.value)}>
                                <option value="Multiple Choice">Multiple Choice</option>
                                <option value="True False">True False</option>
                                <option value="Fill in the blanks">Fill in the blanks</option>
                            </select>
                            <br />
                            {selectedType === 'Multiple Choice' && <>
                                <label htmlFor="questionTitle">Title</label>
                                <input type="text" id="questionTitle" className="form-control" onChange={(e) => setcurrQuestion({ ...currQuestion, title: e.target.value })} aria-required />
                                <br />
                                <label htmlFor="pointsQ">Points</label>
                                <input type="number" className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setcurrQuestion({ ...currQuestion, points: e.target.value })} aria-required />
                                <br />
                                <b>Question:</b>
                                <Editor id="questionDesc" value={currQuestion?.description} onChange={(e) => setcurrQuestion({ ...currQuestion, description: e.target.value })} aria-required />
                                <br />
                                <b>Choices:</b>
                                <br />
                                <input type="text" id="option 1" className="form-control" onChange={(e) => handleChoicesChange(0, e)} />
                                <input type="radio" id="MC1" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 1 })} />
                                <label className="form-check-label" htmlFor="MC1">Is Correct</label>
                                <br />
                                <input type="text" id="option 2" className="form-control" onChange={(e) => handleChoicesChange(1, e)} />
                                <input type="radio" id="MC2" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 2 })} />
                                <label className="form-check-label" htmlFor="MC2">Is Correct</label>
                                <br />
                                <input type="text" id="option 3" className="form-control" onChange={(e) => handleChoicesChange(2, e)} />
                                <input type="radio" id="MC3" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 3 })} />
                                <label className="form-check-label" htmlFor="MC3">Is Correct</label>
                                <br />
                                <input type="text" id="option 4" className="form-control" onChange={(e) => handleChoicesChange(3, e)} />
                                <input type="radio" id="MC4" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 4 })} />
                                <label className="form-check-label" htmlFor="MC4">Is Correct</label>
                                <br />
                            </>
                            }

                            {selectedType === 'True False' && <>
                                <label htmlFor="questionTitle">Title</label>
                                <input type="text" id="questionTitle" className="form-control" onChange={(e) => setcurrQuestion({ ...currQuestion, title: e.target.value })} aria-required/>
                                <br />
                                <label htmlFor="pointsQ">Points</label>
                                <input type="number" className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setcurrQuestion({ ...currQuestion, points: e.target.value })} aria-required />
                                <br />
                                <b>Question:</b>
                                <Editor id="questionDesc" value={currQuestion?.description} onChange={(e) => setcurrQuestion({ ...currQuestion, description: e.target.value })} aria-required/>
                                <br />
                                <b>Choices:</b>
                                <br />
                                <input type="text" id="option 1" className="form-control" value={"True"} disabled />
                                <input type="radio" id="TF1" name="TF" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 0 })} />
                                <label className="form-check-label" htmlFor="TF1">Is Correct</label>
                                <br />
                                <input type="text" id="option 2" className="form-control" value={"False"} disabled />
                                <input type="radio" id="TF2" name="TF" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 1 })} />
                                <label className="form-check-label" htmlFor="TF2">Is Correct</label>
                                <br />
                            </>}

                            {selectedType === 'Fill in the blanks' && <>
                                <label htmlFor="questionTitle">Title</label>
                                <input type="text" id="questionTitle" className="form-control" onChange={(e) => setcurrQuestion({ ...currQuestion, title: e.target.value })} aria-required/>
                                <br />
                                <label htmlFor="pointsQ">Points</label>
                                <input type="number" className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setcurrQuestion({ ...currQuestion, points: e.target.value })} aria-required/>
                                <br />
                                <b>Question:</b>
                                <Editor id="questionDesc" value={currQuestion?.description} onChange={(e) => setcurrQuestion({ ...currQuestion, description: e.target.value })} aria-required/>
                                <br />
                                <div>
                                    <button onClick={addInputFieldFB}>Add Input Field</button>
                                    {inputsFB.map((input, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={input}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            placeholder={`Input ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>}
                            <br />
                            <button className="btn btn-secondary" onClick={() => handleQuestionCancel()}>Cancel</button>
                            <button className="btn btn-danger" onClick={() => handleQuestionSave()}>Save</button>

                        </>
                        }
                        <div>
                            <button className="btn btn-secondary" onClick={() => handleNewQuestion()}><FaPlus />New Question</button>
                            <button className="btn btn-secondary" ><FaPlus />New Question Group</button>
                            <button className="btn btn-secondary" ><FaSearch />Find Questions</button>
                        </div>

                        
                    </div>
                </Tab>
            </Tabs>
            <hr />
            <div className="row">
                <div className="col-9">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Notify users that this content has changed
                        </label>
                    </div>
                </div>
                <div className="col-3 float-end">
                    <button className="btn btn-secondary" onClick={() => handleCancel()}>Cancel</button>
                    <button className="btn btn-success" onClick={() => handleSave(true)}>Publish & Save</button>
                    <button className="btn btn-danger" onClick={() => handleSave(false)}>Save</button>
                </div>
            </div>
            <hr />
        </>
    );
}
export default QuizEditor;