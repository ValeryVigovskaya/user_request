import { useLocation, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { openNewModalRequest } from "../../services/actions/new-request-modal-actions";
import { useAppDispatch, useAppSelector } from "../../services";
import {
  onCkickNext,
  onCkickPrev,
} from "../../services/actions/pagination-actions";
import { FC } from "react";

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { page } = useAppSelector((state) => state.pagination);
  const { totalCount } = useAppSelector((state) => state.requests);

  const goToForm = () => {
    dispatch(openNewModalRequest());
    const locationState = { background: location };
    navigate("/form", { state: locationState });
  };

  const goToNextPage = () => {
    dispatch(onCkickNext(page));
  };

  const goToPrevPage = () => {
    dispatch(onCkickPrev(page));
  };

  const totalPage = () => {
    //тк на бекенде изначально определила количество выводимых элементов
    return Math.ceil(totalCount / 5);
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.header__list}>
          <li>
            <button
              onClick={goToForm}
              className={styles.header__modalbtn}
              type="button"
            >
              Новый запрос
            </button>
          </li>
          <li className={styles.header__count}>
            {page} из {totalPage()}
          </li>
          <li>
            <button
              onClick={goToPrevPage}
              className={`${styles.header__btn} ${styles.header__btn_prev}`}
              disabled={page <= 1 ? true : false}
            ></button>
          </li>
          <li>
            <button
              onClick={goToNextPage}
              className={`${styles.header__btn} ${styles.header__btn_next}`}
              disabled={page >= totalPage() ? true : false}
            ></button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
