import { useState } from "react";
import { TEvent } from "../utils/types";

export function useForm<
  T extends { [key: string]: string | number | null | string[] }
>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  // const setFileValue = (name: keyof T, file: string | null) => {
  //   setValues({ ...values, [name]: file });
  // };

  const handleChange = (event: TEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
