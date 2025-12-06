import React from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const Siderbar = () => {
  return (
    <section className={styles.sidebar} id="sidebar">
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>Health Care</div>
        </div>
      </div>

      <nav className={styles.navMenu}>
        <Link
          to="bang-dieu-khien"
          className={`${styles.navItem} ${styles.active}`}
        >
          <span className={styles.navIcon}>
            <GridViewIcon />
          </span>
        </Link>

        <Link to="benh-nhan" className={styles.navItem}>
          <span className={styles.navIcon}>
            <PersonOutlineOutlinedIcon />
          </span>
        </Link>

        <Link to="bac-si" className={styles.navItem}>
          <span className={styles.navIcon}>
            <PeopleAltOutlinedIcon />
          </span>
        </Link>

        <Link to="lich-lam-viec" className={styles.navItem}>
          <span className={styles.navIcon}>
            <CalendarMonthOutlinedIcon />
          </span>
        </Link>
        <Link to="cai-dat" className={styles.navItem}>
          <span className={styles.navIcon}>
            <SettingsOutlinedIcon />
          </span>
        </Link>
      </nav>
    </section>
  );
};

export default Siderbar;
