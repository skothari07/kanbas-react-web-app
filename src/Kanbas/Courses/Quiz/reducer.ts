import { createSlice } from "@reduxjs/toolkit";

interface Question {
    description: string;
    points: Number,
    question_type: string;
    options: [{
        text: String,
        isCorrect: Boolean
    }];
    trueFalse : Boolean,
    blanks:[{
        answer: String
    }]
}

interface Quiz {
    qid: string;
    title: string;
    desc: string;
    points: number;
    quiz_type: "Graded Quiz" | "Practice Quiz" | "Graded Survey" | "Ungraded Survey";
    assignment_group: "Quizzes" | "Exams" | "Assignments" | "Project";
    shuffle_answers: boolean;
    isTimeLimit: Boolean;
    time_limit: number;
    multiple_attempts: boolean;
    show_correct_answers: boolean;
    access_code: string;
    one_question: boolean;
    webcam_required: boolean;
    lock_questions: boolean;
    available: Date | null;
    due_date: Date | null;
    until_date: Date | null;
    isPublished: Boolean;
    course: string;
    questions: [Question] | [];
}

interface QuizzesState {
    quizzes: Quiz[];
    quiz: Quiz;
    question: Question;
    questions: Question[];
}

const initialState: QuizzesState = {
    quizzes: [],
    questions: [],
    question: { description: "", points: 0, options: [{ text: "", isCorrect: false }], question_type: "", trueFalse: false, blanks: [{answer: ""}] },
    quiz: {
        qid: "", title: "New Quiz", desc: "New Description", due_date: null, points: 0, course: "", isPublished: false, questions: [],
        quiz_type: "Graded Quiz",
        assignment_group: "Quizzes",
        shuffle_answers: true,
        isTimeLimit: true,
        time_limit: 20,
        multiple_attempts: false,
        show_correct_answers: false,
        access_code: "",
        one_question: true,
        webcam_required: false,
        lock_questions: false,
        available: null,
        until_date: null
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
                if (quiz.qid === action.payload.qid) {
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