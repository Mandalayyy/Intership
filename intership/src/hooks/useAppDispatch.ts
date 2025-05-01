import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";

// Створюємо типізований хук для dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;