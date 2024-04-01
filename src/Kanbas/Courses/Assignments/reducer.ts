import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
    _id: string;
    title: string;
    desc: string;
    due_date: Date | null;
    points: number;
    course: string;
}

interface AssignmentsState {
    assignments: Assignment[];
    assignment: Assignment;
}

const initialState: AssignmentsState = {
    assignments: [],
    assignment: { _id: "", title: "New Module 123", desc: "New Description", due_date: null, points: 0, course: "" },
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
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
            
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },

        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
    },
});
export const { addAssignment, deleteAssignment,
    updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;

export default assignmentsSlice.reducer;