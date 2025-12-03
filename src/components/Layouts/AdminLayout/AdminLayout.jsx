import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className={styles.layoutWrapper}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
