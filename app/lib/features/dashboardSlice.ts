import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DashboardState {
    navPhase: string,
    newSessionPhase: string,
}

const initialState: DashboardState = {
    navPhase: 'newSession',
    newSessionPhase: 'uploadResume',
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateNavPhase: (state, action: PayloadAction<string>) => {
            state.navPhase = action.payload;
        },
        updateNewSessionPhase: (state, action: PayloadAction<string>) => {
            state.newSessionPhase = action.payload;
        }
    }
})

export const { updateNavPhase, updateNewSessionPhase } = dashboardSlice.actions;

export default dashboardSlice.reducer;