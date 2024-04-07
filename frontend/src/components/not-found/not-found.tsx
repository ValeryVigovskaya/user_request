import styles from "./not-found.module.css";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>404 page not found</h3>
      <p className={styles.subtitle}>Извините, пока, тут ничего нет</p>
    </div>
  );
};
