import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import { FC, useEffect } from "react";
import styles from "./request-details.module.css";
import {
  closeModalRequestDetails,
  getRequestFromApi,
} from "../../services/actions/request-by-id-actions";
import { formattedDate } from "../../utils/functions";
import { Loader } from "../loader/loader";

interface Params {
  id: string;
}

export const RequestDetails: FC = () => {
  const { request, requestRequest, requestFailed } = useAppSelector(
    (state) => state.getRequest
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(closeModalRequestDetails());
    navigate(-1);
  };
  const { id } = useParams<keyof Params>() as Params;

  const orderNumber = id;

  const countImg = () => {
    return request?.img?.length;
  }

  useEffect(() => {
    dispatch(getRequestFromApi(orderNumber));
  }, [dispatch, orderNumber]);

  if (requestFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (requestRequest) {
    return <Loader />;
  } else {
    return (
      <div className={styles.container}>
        <ul className={styles.container__list}>
          <li>
            <span className={styles.container__item}>Номер запроса:</span>{" "}
            {request?.requestNumber}
          </li>
          <li>
            <span className={styles.container__item}>Тип запроса:</span>{" "}
            {request?.type}
          </li>
          <li>
            <span className={styles.container__item}>Описание:</span>{" "}
            {request?.caption}
          </li>
          <li>
            <span className={styles.container__item}>Пользователь:</span>{" "}
            {request?.username}
          </li>
          <li>
            <span className={styles.container__item}>Дата:</span>{" "}
            {formattedDate(request?.createdAt as Date)}
          </li>
          <li>
            <span className={styles.container__item}>Статус:</span>{" "}
            {request?.status}
          </li>
          <li>
            <span className={styles.container__item}>Количество вложенных файлов :</span>{" "}
            {countImg()}
          </li>
        </ul>
        <button
          type="button"
          aria-label="close_button"
          className={styles.btn}
          onClick={onClick}
        >
          Закрыть
        </button>
      </div>
    );
  }
};
