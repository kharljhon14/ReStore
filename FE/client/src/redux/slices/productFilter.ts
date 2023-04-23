import { IFilterParams } from '@/types/filterParams';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IFilterParams = {};
const productFilterSlice = createSlice({
  name: 'productFilter',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IFilterParams>) => {
      const { OrderBy, SearchTerm, Brands, Types } = action.payload;

      Object.assign(state, { OrderBy, SearchTerm, Brands, Types });
    },
  },
});

export const { set } = productFilterSlice.actions;

export default productFilterSlice.reducer;
