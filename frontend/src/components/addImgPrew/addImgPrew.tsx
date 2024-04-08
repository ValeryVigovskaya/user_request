import { FC } from "react";
import styles from "./addImgPrew.module.css"

export type TImgContainerProps = {
    arrayImg: string[];
  };

export const AddImgPrew: FC<TImgContainerProps> = ({arrayImg}) => {
  return (
    <div id="imagePrewContainer" className={styles.container}>
      {arrayImg.map((src, index) => (
        <img key={index} alt="Preview"  src={src} className={styles.img}/>
      ))}
    </div>
  );
};
