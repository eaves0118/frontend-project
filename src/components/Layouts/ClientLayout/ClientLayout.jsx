import Header from "./header/header";
import Footer from "./footer/footer";
import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.main__container}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientLayout;
