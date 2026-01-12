import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { ShoppingItem } from "../types/shopping";

const initialState = {
  items: [] as ShoppingItem[],
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<Omit<ShoppingItem, "id" | "purchased" | "dateAdded"> & { dateAdded: string }>
    ) => {
      const newItem: ShoppingItem = {
        ...action.payload,
        id: uuidv4(),
        purchased: false,
      };
      state.items.unshift(newItem);
    },

    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.purchased = !item.purchased;
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    editItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },

    // ✅ NEW: set the entire items array (used for loading from AsyncStorage)
    setItems: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, togglePurchased, deleteItem, editItem, setItems } =
  shoppingSlice.actions;

export default shoppingSlice.reducer;
