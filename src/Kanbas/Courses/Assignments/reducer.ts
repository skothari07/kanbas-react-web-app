import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
    assignment: { title: "New Module 123", desc: "New Description", due_date: null, points: 0 },
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                { ...action.payload, _id: new Date().getTime().toString() },
                ...state.assignments,
            ];
            console.log(state.assignments);
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                
                console.log(action.payload._id);
                if (assignment._id === action.payload._id) {console.log(action.payload.title)
                    console.log(action.payload);
                    return action.payload;
                } else {
                    return assignment;
                }
            });
            
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
            console.log(state.assignment)
        },
    },
});
export const { addAssignment, deleteAssignment,
    updateAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;