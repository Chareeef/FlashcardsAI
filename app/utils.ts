import { Dispatch, SetStateAction } from "react";

export const showError = (
  error: string,
  setError: Dispatch<SetStateAction<string>>,
  setOpenError: Dispatch<SetStateAction<boolean>>,
) => {
  setError(error);
  setOpenError(true);
  setTimeout(() => setOpenError(false), 3000);
};
