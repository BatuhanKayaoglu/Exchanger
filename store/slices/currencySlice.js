import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCurrency: 'EUR', 
};

const currencySlice = createSlice({
  name: 'currency', 
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload; 
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
