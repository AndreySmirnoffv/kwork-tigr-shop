import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import s from "./MainLayout.module.scss";

export const MainLayout = () => {
  return (
    <div className={s.wrapper}>
      <Header />

      <main className={s.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
