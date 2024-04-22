import { createSlice } from "@reduxjs/toolkit";

interface Question {
    quizId: string;
    description: string;
    options: [];
    type: string;
    answers: [];
}

interface Quiz {
    _id: string;
    title: string;
    desc: string;
    due_date: Date | null;
    points: number;
    course: string;
    isPublished: Boolean;
    questions: [Question] ;
}

interface QuizzesState {
    quizzes: Quiz[];
    quiz: Quiz;
}

const initialState: QuizzesState = {
    quizzes: [],
    quiz: { _id: "", title: "New Quiz", desc: "New Description", due_date: null, points: 0, course: "", isPublished: false, questions: [{quizId: "", description: "", options:[], type: "", answers:[]}] },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            state.quizzes = [
                { ...action.payload, _id: new Date().getTime().toString() },
                ...state.quizzes,
            ];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
                if (quiz._id === action.payload._id) {
                    return action.payload;
                } else {
                    return quiz;
                }
            });
            
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },

        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
    },
});
export const { addQuiz, deleteQuiz,
    updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;

export default quizzesSlice.reducer;