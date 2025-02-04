import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCurrency: 'EUR', 
  secondCurrency: 'USD',
};

const currencySlice = createSlice({
  name: 'currency', 
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload; 
    },
    setSecondCurrency: (state, action) => {
      state.secondCurrency = action.payload; 
    },
  },
});

export const { setCurrency, setSecondCurrency } = currencySlice.actions;
export default currencySlice.reducer;
