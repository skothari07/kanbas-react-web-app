import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/reducer";
import authReducer from "../../auth/reducer";
import quizzesReducer from "../Courses/Quiz/reducer";

export interface KanbasState {
    modulesReducer: {
        modules: any[];
        module: any;
    };
    assignmentsReducer: {
        assignments: any[];
        assignment: any;
    };
    authReducer: {
        isAuthenticated: Boolean;
        userRole: String;
    };
    quizzesReducer: {
        quizzes: any[];
        quiz: any;
    }
}
const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        authReducer,
        quizzesReducer
    }
});
export default store;