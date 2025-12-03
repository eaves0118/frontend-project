import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import TextFields from "../../../components/ui/TextFields";
import Illustration from "@images/draw.png";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className={styles.auth}>
      <div className={styles.auth__illustration}>
        <img src={Illustration} alt="" />
      </div>

      <div className={styles.auth__content}>
        <form className={styles.auth__form}>
          <div className={styles.auth__social}>
            <h3 className="m-0">Đăng ký với</h3>
            <div className={styles.auth__social_list}>
              <div className={styles.auth__social_item}>
                <FaFacebookF />
              </div>
              <div className={styles.auth__social_item}>
                <FaTwitter />
              </div>
              <div className={styles.auth__social_item}>
                <FaLinkedinIn />
              </div>
            </div>
          </div>

          <div className={styles.auth__divider}>hoặc</div>

          <TextFields label={"Họ và tên"} type="text" value={form.email} />
          <TextFields label={"Tên đăng nhập"} type="text" value={form.email} />
          <TextFields label={"Email"} type="text" value={form.email} />
          <TextFields label={"Mật khẩu"} type="password" value={form.email} />
          <TextFields
            label={"Nhập lại mật khẩu"}
            type="password"
            value={form.email}
          />

          <div className={styles.auth__actions_regis}>
            <input type="checkbox" />
            <p className="m-0">Tôi đã đọc và đồng ý các điều khoản</p>
          </div>

          <Button content={"Đăng ký"} />

          <div className={styles.auth__register}>
            <span>Đã có tài khoản?</span>
            <Link to="/dang-nhap" className={styles.auth__register_link}>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
