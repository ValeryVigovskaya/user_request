import { useNavigate } from "react-router-dom";
import styles from "./window-appeal.module.css";
import { useAppDispatch, useAppSelector } from "../services";
import addImg from "../images/plus-svgrepo-com.svg";
import { FC, FormEvent } from "react";
import {
  closeNewModalRequest,
  postRequestFetch,
} from "../services/actions/new-request-modal-actions";
import { useForm } from "../hooks/useForm";
import { getDataOnPage } from "../services/actions/request-actions";

export const WindowAppeal: FC = () => {
  const { values, handleChange } = useForm({
    username: "",
    type: "Ошибка",
    caption: "",
    img: null,
  });
  const { page } = useAppSelector((state) => state.pagination);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeNewModalRequest());
    navigate(-1);
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postRequestFetch(values, page));
    //обновляем состояние в таблице
    onClose();
  };

  return (
    <>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <fieldset className={styles.form__border}>
          <legend className={styles["form__group-title"]}>
            Автор обращения
          </legend>
          <input
            type="text"
            value={values.username}
            name="username"
            placeholder="Иванов Иван Иванович"
            className={styles.form__input}
            onChange={handleChange}
            minLength={2}
            maxLength={30}
            pattern="^[a-zA-ZаА-яЯёЁ\s\-]+$"
            required
          ></input>
        </fieldset>
        <fieldset className={styles.form__border}>
          <legend className={styles["form__group-title"]}>Тип запроса</legend>
          <select
            name="type"
            id="type-select"
            className={styles.form__input}
            value={values.type}
            onChange={handleChange}
          >
            <option>Ошибка</option>
            <option>Новая функциональность</option>
            <option>Улучшение</option>
            <option>Документация</option>
          </select>
        </fieldset>
        <label className={styles["form__container-input"]}>
          <span className={styles["form__input-title"]}>Добавить описание</span>
          <textarea
            name="caption"
            value={values.caption}
            onChange={handleChange}
            placeholder="Введите описание запроса"
            className={`${styles["form__border"]} ${styles["form__input-large"]}`}
            // cols=40
            // rows="3"
            minLength={50}
            maxLength={300}
            required
          ></textarea>
        </label>
        <label
          htmlFor="imageUpload"
          className={`${styles["form__input-title"]} ${styles["form__container-image"]}`}
        >
          Добавить изображение
          <img
            src={addImg}
            alt="Добавить изображение"
            className={styles["form__image-btn"]}
          />
        </label>

        <input
          type="file"
          id="imageUpload"
          name="img"
          accept="image/*"
          style={{ display: "none" }}
          multiple={false}
        />
        {/* <img alt="Preview" ref={uploadedImage}/> */}
        <div className={styles["form__btn-container"]}>
          <button
            type="submit"
            aria-label="save_button"
            className={styles.form__btn}
          >
            Сохранить
          </button>
          <button
            type="button"
            aria-label="close_button"
            className={styles.form__btn}
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>
      </form>
    </>
  );
};
