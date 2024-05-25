import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthInfo } from '@/types/user'

export interface UserState {
    info: AuthInfo | null,
    currentPage: string
}

const initialState: UserState = {
    info: null,
    currentPage: 'dashboard'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateInfo: (state, action: PayloadAction<AuthInfo>) => {
            state.info = action.payload;
        },
        updateCurrentPage: (state, action: PayloadAction<string>) => {
            state.currentPage = action.payload;
        }
    },
})

export const { updateInfo, updateCurrentPage } = userSlice.actions;

export default userSlice.reducer;
