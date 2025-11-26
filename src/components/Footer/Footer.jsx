import React from "react";
import { Container } from "react-bootstrap";
import styles from "./style.module.scss";
import Logo from "@images/logo.01.svg";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container fluid className={styles.footerContainer}>
        {/* Logo + Tên */}
        <div className={styles.footerBrand}>
          <img src={Logo} alt="Chewi Hospital" className={styles.logo} />
          <h2 className={styles.name}>Bệnh viện Chewi</h2>
        </div>

        {/* Thông tin liên hệ */}
        <div className={styles.footerInfo}>
          <p>Địa chỉ: 123 Đường Y Khoa, Quận 1, TP.HCM</p>
          <p>Email: info@chewi-hospital.vn</p>
          <p>Hotline: 1900 123 456</p>
        </div>

        {/* Menu nhanh */}
        <div className={styles.footerMenu}>
          <h4>Menu</h4>
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="/doctors">Đội ngũ bác sĩ</a></li>
            <li><a href="#">Liên hệ</a></li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div className={styles.footerSocial}>
          <h4>Kết nối với chúng tôi</h4>
          <div className={styles.socialIcons}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </Container>

      <div className={styles.footerCopy}>
        &copy; {new Date().getFullYear()} Bệnh viện Chewi. Bảo lưu mọi quyền.
      </div>
    </footer>
  );
};

export default Footer;
