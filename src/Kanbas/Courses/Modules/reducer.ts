import { createSlice } from "@reduxjs/toolkit";

interface Module {
    mid: string;
    name: string;
    description: string;
    course: string,
    lessons: []
}

interface ModuleState {
    modules: Module[];
    module: Module;
}

const initialState: ModuleState = {
    modules: [],
    module: { mid: "", name: "New Module 123", description: "New Description", course: "",lessons: [] },
};


const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        addModule: (state, action) => {
            state.modules = [
                { ...action.payload,},
                ...state.modules,
            ];
        },
        deleteModule: (state, action) => {
            state.modules = state.modules.filter(
                (module) => module.mid !== action.payload
            );
        },
        updateModule: (state, action) => {
            state.modules = state.modules.map((module) => {
                if (module.mid === action.payload.mid) {
                    return action.payload;
                } else {
                    return module;
                }
            });
        },
        setModule: (state, action) => {
            state.module = action.payload;
        },

        setModules: (state, action) => {
            state.modules = action.payload;
        },
    },
});
export const { addModule, deleteModule,
    updateModule, setModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;