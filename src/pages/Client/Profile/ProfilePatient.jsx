import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import {patientApi} from "../../../services/api"
import TextFields from "@components/ui/TextFields";
import Button from "@components/ui/Button";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Lấy thông tin user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("userId"); // Lưu khi login
        const { data } = await patientApi.getUserById(id);
        setProfile(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Đang tải...</p>;

  // Upload avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);

    const form = new FormData();
    form.append("avatar", file);

    try {
      const { data } = await userApi.uploadAvatar(form);
      setFormData((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
    } catch (error) {
      console.error("Upload avatar failed", error);
    }
  };

  // Nhập text input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu thông tin
  const saveProfile = async () => {
    try {
      const update = {
        fullName: formData.fullName,
        address: formData.address,
        phone: formData.phone,
      };

      await userApi.updateMe(update);

      setProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className={styles.profile}>
      <h2>Hồ sơ cá nhân</h2>

      <div className={styles.profileInfo}>
        {/* AVATAR */}
        <div className={styles.avatarSection}>
          <img
            src={avatarPreview || formData.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            className={styles.avatar}
          />

          {editing && (
            <label className={styles.uploadButton}>
              Chọn ảnh mới
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </label>
          )}
        </div>

        {/* FORM */}
        <div className={styles.infoSection}>
          <TextFields
            label="Họ và tên"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            disabled={!editing}
          />

          <TextFields
            label="Email"
            name="email"
            value={formData.email}
            disabled
          />

          <TextFields
            label="Số điện thoại"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            disabled={!editing}
          />

          <TextFields
            label="Địa chỉ"
            name="address"
            value={formData.address || ""}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className={styles.actions}>
        {editing ? (
          <>
            <Button content="Lưu lại" onClick={saveProfile} />
            <Button
              content="Hủy"
              mode="secondary"
              onClick={() => {
                setEditing(false);
                setFormData(profile);
                setAvatarPreview(null);
              }}
            />
          </>
        ) : (
          <Button content="Chỉnh sửa" onClick={() => setEditing(true)} />
        )}
      </div>
    </div>
  );
};

export default Profile;
