import styles from "./home-page.module.css";
import { Table } from "../components/table/table";

function HomePage() {
  return (
    <>
      <main>
        <Table />
      </main>
      <footer className={styles.footer}>&copy;2024 Халитова Валерия</footer>
    </>
  );
}

export default HomePage;
