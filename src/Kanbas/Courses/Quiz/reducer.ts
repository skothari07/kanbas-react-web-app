import { createSlice } from "@reduxjs/toolkit";

interface Question {
    quizId: string;
    description: string;
    options: [];
    type: string;
    answers: [];
}

interface Quiz {
    qid: string;
    title: string;
    desc: string;
    points: number;
    quiz_type: "Graded Quiz" | "Practice Quiz" | "Graded Survey" | "Ungraded Survey";
    assignment_group: "Quizzes" | "Exams" | "Assignments" | "Project";
    shuffle_answers: boolean;
    time_limit: number;
    multiple_attempts: boolean;
    show_correct_answers: boolean;
    access_code: string;
    one_question: boolean;
    webcam_required: boolean;
    lock_questions: boolean;
    available: Date;
    due_date: Date | null;
    until_date: Date;
    isPublished: Boolean;
    course: string; // or you can use a specific type for course
    questions: [Question];
}

interface QuizzesState {
    quizzes: Quiz[];
    quiz: Quiz;
}

const initialState: QuizzesState = {
    quizzes: [],
    quiz: {
        qid: "", title: "New Quiz", desc: "New Description", due_date: null, points: 0, course: "", isPublished: false, questions: [{ quizId: "", description: "", options: [], type: "", answers: [] }],
        quiz_type: "Graded Quiz",
        assignment_group: "Quizzes",
        shuffle_answers: false,
        time_limit: 0,
        multiple_attempts: false,
        show_correct_answers: false,
        access_code: "",
        one_question: false,
        webcam_required: false,
        lock_questions: false,
        available: new Date(),
        until_date: new Date()
    },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            state.quizzes = [
                { ...action.payload, },
                ...state.quizzes,
            ];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz.qid !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
                console.log(action.payload);
                if (quiz.qid === action.payload.qid) {
                    console.log(action.payload)
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