import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	chatID: [],
};

const reduxState = createSlice({
	name: "instagram",
	initialState,
	reducers: {
		getChatId: (state, { payload }) => {
			state.chatID = payload;
		},
	},
});

export const { getChatId } = reduxState.actions;
export default reduxState.reducer;
