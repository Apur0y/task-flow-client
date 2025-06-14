import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IProject } from "../../types/project"; // Adjust path if needed
import axios from "axios";

const initialState: {
  projects: IProject[];
  loading: boolean;
  error: string | null;
} = {
  projects: [],
  loading: false,
  error: null,
};

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (
    projectData: Omit<IProject, "_id" | "notes" | "createdAt" | "updatedAt">,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://taskflow-server-pi.vercel.app/api/project",
        projectData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
    updateProject: (state, action: PayloadAction<IProject>) => {
      const index = state.projects.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) state.projects[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<IProject>) => {
          state.loading = false;
          state.projects.push(action.payload);
        }
      )
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setProjects, updateProject } = projectSlice.actions;
export default projectSlice.reducer;
