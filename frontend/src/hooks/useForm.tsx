import { useState } from "react";
import { TEvent } from "../utils/types";

export function useForm<
  T extends { [key: string]: string | number | File | null }
>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const setFileValue = (name: keyof T, file: File | null) => {
    setValues({ ...values, [name]: file });
  };

  const handleChange = (event: TEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues, setFileValue };
}
