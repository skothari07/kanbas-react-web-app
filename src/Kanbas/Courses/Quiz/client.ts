import axios from "axios";
axios.defaults.withCredentials = true;

const API_BASE = process.env.REACT_APP_API_BASE2;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZ_API = `${API_BASE}/api/quiz`;

export const findQuizzesForCourse = async (courseId: any) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/quiz`);
    return response.data;
};

export const findQuizById = async (quizId: any) => {
    const response = await axios
        .get(`${COURSES_API}/Quiz/${quizId}`);
    return response.data;
};

export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/quiz`,
        quiz
    );
    return response.data;
};

export const deleteQuiz = async (quizId: any) => {
    const response = await axios
        .delete(`${QUIZ_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZ_API}/${quiz.qid}`, quiz);
    return response.data;
};

export const findQuestionById = async (qsId: any) => {
    const response = await axios
        .get(`${COURSES_API}/quiz/questions/${qsId}`);
    return response.data;
};

export const createQuestion = async (question: any) => {
    const response = await axios.post(
        `${COURSES_API}/quiz/question/create`,
        question
    );
    return response.data;
};

export const deleteQuestion = async (questionId: any) => {
    const response = await axios
        .delete(`${COURSES_API}/quiz/question/${questionId}`);
    return response.data;
};

export const updateQuestion = async (question: any) => {
    const response = await axios.put(`${COURSES_API}/quiz/question/${question.questionId}`, question);
    return response.data;
};