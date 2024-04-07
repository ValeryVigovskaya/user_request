import { FC, useEffect, useState } from "react";
import styles from "./table.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import { getDataOnPage } from "../../services/actions/request-actions";
import { IRequest } from "../../utils/types";
import { formattedDate } from "../../utils/functions";
import { Loader } from "../loader/loader";

export const Table: FC = () => {
  const { objectsOnPage, objectsOnPageRequest, objectsOnPageFailed } =
    useAppSelector((state) => state.requests);
  const [filters, setFilters] = useState({
    date: "",
    author: "",
    type: "",
    status: "",
  });
  const { page } = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();

  const headItems = [
    "Номер запроса",
    "Тип запроса",
    "Описание",
    "Пользователь",
    "Дата",
    "Статус",
  ];

  useEffect(() => {
    dispatch(getDataOnPage(page));
  }, [dispatch, page]);

  const location = useLocation();

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredObjects = objectsOnPage.filter((item) => {
    return (
      formattedDate(item.createdAt).includes(filters.date) &&
      item.username.includes(filters.author) &&
      item.type.includes(filters.type) &&
      item.status.includes(filters.status)
    );
  });

  const statusColor = (item: IRequest) => {
    if (item.status === "В работе") {
      return `${styles.color_blue}`;
    } else if (item.status === "В очереди") {
      return `${styles.color_grey}`;
    } else if (item.status === "Выполнено") {
      return `${styles.color_green}`;
    }
  };

  const typeColor = (item: IRequest) => {
    if (item.type === "Новая функциональность") {
      return `${styles.color_green}`;
    } else if (item.type === "Ошибка") {
      return `${styles.color_red}`;
    } else if (item.type === "Улучшение" || item.type === "Документация") {
      return `${styles.color_blue}`;
    }
  };

  if (objectsOnPageFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (objectsOnPageRequest) {
    return <Loader />;
  } else {
    return (
      <>
        <table className={styles.table}>
          <thead>
            <tr className={`${styles.border} ${styles.head}`}>
              {headItems.map((item) => (
                <th key={item} className={styles.head__item}>
                  {item}
                  {(item === "Тип запроса" ||
                    item === "Пользователь" ||
                    item === "Дата" ||
                    item === "Статус") && (
                    <input
                      type="text"
                      className={styles.head__input}
                      value={
                        item === "Тип запроса"
                          ? filters.type
                          : item === "Пользователь"
                          ? filters.author
                          : item === "Дата"
                          ? filters.date
                          : item === "Статус"
                          ? filters.status
                          : undefined
                      }
                      onChange={(e) =>
                        handleFilterChange(
                          item === "Тип запроса"
                            ? "type"
                            : item === "Пользователь"
                            ? "author"
                            : item === "Дата"
                            ? "date"
                            : item === "Статус"
                            ? "status"
                            : "",
                          e.target.value
                        )
                      }
                      placeholder={item === "Тип запроса"
                      ? "Фильтр по типу"
                      : item === "Пользователь"
                      ? "Фильтр по пользователю"
                      : item === "Дата"
                      ? "Фильтр по дате"
                      : item === "Статус"
                      ? "Фильтр по статусу"
                      : ""}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredObjects?.map((item) => (
              <tr key={item.id} className={`${styles.border} ${styles.list}`}>
                <td>
                  <Link
                    to={`/requests/${item.id}`}
                    state={{ background: location }}
                    className={styles.table__link}
                  >
                    {item.requestNumber}
                  </Link>
                </td>
                <td className={typeColor(item)}>{item.type}</td>
                <td className={styles.table__caption}>{item.caption}</td>
                <td className={styles.table__username}>{item.username}</td>
                <td>{formattedDate(item.createdAt)}</td>
                <td className={statusColor(item)}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
};
