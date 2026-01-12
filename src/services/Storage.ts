import AsyncStorage from "@react-native-async-storage/async-storage";
import { setItems } from "../redux/shoppingSlice";
import { AppDispatch } from "../redux/store";

const STORAGE_KEY = "SHOPPING_ITEMS";

export const saveItems = async (items: any) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const loadItems = async (dispatch: AppDispatch) => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  if (data) {
    dispatch(setItems(JSON.parse(data)));
  }
};
