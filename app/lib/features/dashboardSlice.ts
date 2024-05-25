import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DashboardState {
    navPhase: string
}

const initialState: DashboardState = {
    navPhase: 'newSession'
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateNavPhase: (state, action: PayloadAction<string>) => {
            state.navPhase = action.payload;
        }
    }
})

export const { updateNavPhase } = dashboardSlice.actions;

export default dashboardSlice.reducer;