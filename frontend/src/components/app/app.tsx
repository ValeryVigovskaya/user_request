import styles from "./app.module.css";
import { Header } from "../header/header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../modal/modal";
import { WindowAppeal } from "../../pages/window-appeal";
import HomePage from "../../pages/home-page";
import { RequestDetails } from "../request-details/request-details";
import { NotFound } from "../not-found/not-found";
import { TStateLocation } from "../../utils/types";
import { FC } from "react";

export const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background: TStateLocation =
    location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/form"
            element={
              <Modal onClose={closeModal}>
                <WindowAppeal />
              </Modal>
            }
          />
          <Route
            path="/requests/:id"
            element={
              <Modal onClose={closeModal}>
                <RequestDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
