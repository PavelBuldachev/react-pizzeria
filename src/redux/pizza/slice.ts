import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, PizzaSliceState, Status } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {currentPage, category, sortBy, order, search} = params;
        const { data } = await axios.get<PizzaItem[]>(
            `https://639c192b42e3ad692726f606.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
            );
        return data;
    }
  )

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    },
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;