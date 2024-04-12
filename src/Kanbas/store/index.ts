import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import assignmentsReducer from "../Courses/Assignments/reducer";
import authReducer from "../../auth/reducer";

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
    }
}
const store = configureStore({
    reducer: {
        modulesReducer,
        assignmentsReducer,
        authReducer
    }
});
export default store;