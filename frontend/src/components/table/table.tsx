import { FC, useEffect, useState } from "react";
import styles from "./table.module.css";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";
import { getDataOnPage } from "../../services/actions/request-actions";
import { FilterName, IFilterName, IRequest } from "../../utils/types";
import { formattedDate } from "../../utils/functions";
import { Loader } from "../loader/loader";

export const Table: FC = () => {
  const { objectsOnPage, objectsOnPageRequest, objectsOnPageFailed } =
    useAppSelector((state) => state.requests);
  const [filters, setFilters] = useState<IFilterName>({
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

  const foundFilteredName = (item: string) => {
    switch (
      item === FilterName.Type ||
      item === FilterName.Username ||
      item === FilterName.Date ||
      item === FilterName.Status
    ) {
      case item === FilterName.Type:
        return "type";
      case item === FilterName.Username:
        return "author";
      case item === FilterName.Date:
        return "date";
      case item === FilterName.Status:
        return "status";
      default:
        return "";
    }
  };

  const foundFilteredValue = (item: string, filterName: IFilterName) => {
    switch (
      item === FilterName.Type ||
      item === FilterName.Username ||
      item === FilterName.Date ||
      item === FilterName.Status
    ) {
      case item === FilterName.Type:
        return filterName.type;
      case item === FilterName.Username:
        return filterName.author;
      case item === FilterName.Date:
        return filterName.date;
      case item === FilterName.Status:
        return filterName.status;
      default:
        return undefined;
    }
  };

  const filteredObjects = objectsOnPage.filter((item: IRequest) => {
    return (
      formattedDate(item.createdAt).includes(filters.date) &&
      item.username.toLowerCase().includes(filters.author) &&
      item.type.toLowerCase().includes(filters.type) &&
      item.status.toLowerCase().includes(filters.status)
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
                  {(item === FilterName.Type ||
                    item === FilterName.Username ||
                    item === FilterName.Date ||
                    item === FilterName.Status) && (
                    <input
                      type="text"
                      className={styles.head__input}
                      value={foundFilteredValue(item, filters)}
                      onChange={(e) =>
                        handleFilterChange(
                          foundFilteredName(item),
                          e.target.value
                        )
                      }
                      placeholder={
                        item === FilterName.Type 
                          ? "Фильтр по типу"
                          : item === FilterName.Username
                          ? "Фильтр по пользователю"
                          : item === FilterName.Date
                          ? "Фильтр по дате"
                          : item === FilterName.Status
                          ? "Фильтр по статусу"
                          : ""
                      }
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
