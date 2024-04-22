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
    const response = await axios.put(`${QUIZ_API}/${quiz._id}`, quiz);
    return response.data;
};