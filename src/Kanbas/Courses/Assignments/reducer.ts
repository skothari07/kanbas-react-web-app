import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
    aid: string;
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
    assignment: { aid: "", title: "New Assignment 123", desc: "New Description", due_date: null, points: 0, course: "" },
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                { ...action.payload },
                ...state.assignments,
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment.aid !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment.aid === action.payload.aid) {
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