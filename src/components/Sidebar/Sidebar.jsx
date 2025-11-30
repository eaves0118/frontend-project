import React from "react";
import styles from "./style.module.scss";
import { AiFillDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { BsCalendarDateFill } from "react-icons/bs";
const Sidebar = () => {
  return (
    <section className={styles.sidebar} id="sidebar">
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>Health online</div>
        </div>
      </div>

      <nav className={styles.navMenu}>
        <div className={`${styles.navItem} ${styles.active}`}>
          <span className={styles.navIcon}>
            <AiFillDashboard />
          </span>
          <span>Dashboard</span>
        </div>

        <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <FaUser />
          </span>
          <span>Patients</span>
        </div>

        <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <FaUserDoctor />
          </span>
          <span>Doctors</span>
        </div>

        <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <MdAnalytics />
          </span>
          <span>Analytics</span>
        </div>

        <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <BsCalendarDateFill />
          </span>
          <span>Appointment</span>
        </div>

        <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <BiSolidReport />
          </span>
          <span>Reports</span>
        </div>

        <div className={styles.navItem}>
          <span className={styles.navIcon}>
            <IoMdSettings />
          </span>
          <span>Settings</span>
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
