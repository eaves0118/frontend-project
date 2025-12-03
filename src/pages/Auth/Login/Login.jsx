import React, { useContext, useState } from "react";
import styles from "./style.module.scss";
import Illustration from "@images/draw.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Button from "../../../components/ui/Button";
import TextFields from "../../../components/ui/TextFields";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
        .required("Mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={styles.auth}>
      <div className={styles.auth__illustration}>
        <img src={Illustration} alt="" />
      </div>

      <div className={styles.auth__content}>
        <form className={styles.auth__form} onSubmit={formik.handleSubmit}>
          <div className={styles.auth__social}>
            <h3 className="m-0">Đăng nhập với</h3>
          </div>

          <div className={styles.auth__divider}>Hoặc</div>

          <TextFields
            label={"Email"}
            type="text"
            id="email"
            name="email"
            formik={formik}
          />

          <TextFields
            label={"Mật khẩu"}
            type={"password"}
            id="password"
            name="password"
            formik={formik}
          />

          <div className={styles.auth__actions}>
            <input type="checkbox" />
            <p className="m-0">Remember me</p>
            <span className={styles.auth__forgot}>Quên mật khẩu?</span>
          </div>

          <Button content={"Đăng nhập"} type="submit" />

          <div className={styles.auth__register}>
            <span>Không có tài khoản?</span>
            <Link to="/dang-ky" className={styles.auth__register_link}>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
