import ReactLoading from "react-loading";
import loader from "./loader.module.css";
import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className={loader.container}>
      <ReactLoading type={"spin"} color="black" height={100} width={100} />
    </div>
  );
};
