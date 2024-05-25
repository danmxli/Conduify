import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthInfo } from '@/types/user'

export interface UserState {
    info: AuthInfo | null
}

const initialState: UserState = {
    info: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateInfo: (state, action: PayloadAction<AuthInfo>) => {
            state.info = action.payload;
        }
    },
})

export const { updateInfo } = userSlice.actions;

export default userSlice.reducer;
