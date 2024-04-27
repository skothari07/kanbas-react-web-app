import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";
import * as client from "../client";
import Editor from 'react-simple-wysiwyg';


function EditQuestion() {

    const { questionId } = useParams();
    const { quizId } = useParams();
    const { courseId } = useParams();
    const navigate = useNavigate();

    const qs = useSelector((state: KanbasState) =>
        state.quizzesReducer.question);

    const [currQuestion, setcurrQuestion] = useState<any>(qs);
    const [choices, setChoices] = useState<string[]>(['', '', '', '']);
    const [inputsFB, setInputsFB] = useState<string[]>([]);
    
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
    
    const handleQuestionCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/edit/${quizId}`);
    }

    const handleQuestionSave = () => {
        const currQ = { ...currQuestion, options: choices, blanks: inputsFB }
        client.updateQuestion(currQ).then(() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/edit/${quizId}`));
    }

    useEffect(() => {
        client.findQuestionById(questionId)
            .then((question) =>
                setcurrQuestion(question[0]));
    }, [questionId]); 

    return (
        <>
            {currQuestion.question_type === 'Multiple Choice' && <>
                                <label htmlFor="questionTitle">Title</label>
                                <input type="text" id="questionTitle" value={currQuestion.title} className="form-control" onChange={(e) => setcurrQuestion({ ...currQuestion, title: e.target.value })} aria-required />
                                <br />
                                <label htmlFor="pointsQ">Points</label>
                                <input type="number" value={currQuestion.points} className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setcurrQuestion({ ...currQuestion, points: e.target.value })} aria-required />
                                <br />
                                <b>Question:</b>
                                <Editor id="questionDesc" value={currQuestion?.description} onChange={(e) => setcurrQuestion({ ...currQuestion, description: e.target.value })} aria-required />
                                <br />
                                <b>Choices:</b>
                                <br />
                                <input type="text" id="option 1" value={currQuestion.options[0]} className="form-control" onChange={(e) => handleChoicesChange(0, e)} />
                                <input type="radio" id="MC1" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 1 })} />
                                <label className="form-check-label" htmlFor="MC1">Is Correct</label>
                                <br />
                                <input type="text" id="option 2" value={currQuestion.options[1]} className="form-control" onChange={(e) => handleChoicesChange(1, e)} />
                                <input type="radio" id="MC2" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 2 })} />
                                <label className="form-check-label" htmlFor="MC2">Is Correct</label>
                                <br />
                                <input type="text" id="option 3" value={currQuestion.options[2]} className="form-control" onChange={(e) => handleChoicesChange(2, e)} />
                                <input type="radio" id="MC3" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 3 })} />
                                <label className="form-check-label" htmlFor="MC3">Is Correct</label>
                                <br />
                                <input type="text" id="option 4" value={currQuestion.options[3]} className="form-control" onChange={(e) => handleChoicesChange(3, e)} />
                                <input type="radio" id="MC4" name="MC" onChange={(e) => setcurrQuestion({ ...currQuestion, correctChoiceIndex: 4 })} />
                                <label className="form-check-label" htmlFor="MC4">Is Correct</label>
                                <br />
                            </>
                            }

                            {currQuestion.question_type === 'True False' && <>
                                <label htmlFor="questionTitle">Title</label>
                                <input type="text" value={currQuestion.title} id="questionTitle" className="form-control" onChange={(e) => setcurrQuestion({ ...currQuestion, title: e.target.value })} aria-required />
                                <br />
                                <label htmlFor="pointsQ">Points</label>
                                <input type="number" value={currQuestion.points} className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setcurrQuestion({ ...currQuestion, points: e.target.value })} aria-required />
                                <br />
                                <b>Question:</b>
                                <Editor id="questionDesc" value={currQuestion?.description} onChange={(e) => setcurrQuestion({ ...currQuestion, description: e.target.value })} aria-required />
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

                            {currQuestion.question_type === 'Fill in the blanks' && <>
                                <label htmlFor="questionTitle">Title</label>
                                <input type="text" id="questionTitle" value={currQuestion.title} className="form-control" onChange={(e) => setcurrQuestion({ ...currQuestion, title: e.target.value })} aria-required />
                                <br />
                                <label htmlFor="pointsQ">Points</label>
                                <input type="number" value={currQuestion.points} className="form-control" id="pointsQ" placeholder="Enter Points" onChange={(e) => setcurrQuestion({ ...currQuestion, points: e.target.value })} aria-required />
                                <br />
                                <b>Question:</b>
                                <Editor id="questionDesc" value={currQuestion?.description} onChange={(e) => setcurrQuestion({ ...currQuestion, description: e.target.value })} aria-required />
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
    );
}

export default EditQuestion;