// src/pages/Admin/Profile/AdminProfile.jsx
import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, ListGroup,
  Alert, Image, Form, Button,
} from "react-bootstrap";
import {
  FiUser, FiMail, FiCalendar, FiEdit3,
  FiCheck, FiX, FiCamera,
} from "react-icons/fi";
import authApi from "@/services/api";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getMe();
        setAdmin(res.data);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Không thể tải thông tin quản trị viên");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const startEdit = (field, value) => {
    setEditField(field);
    setTempValue(value);
  };

  const cancelEdit = () => {
    setEditField(null);
    setTempValue("");
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setTempValue(file);
    }
  };

  const saveEdit = () => {
    const updated = { ...admin };

    if (editField === "fullName") updated.profile.fullName = tempValue;
    if (editField === "gender") updated.profile.gender = tempValue;
    if (editField === "email") updated.email = tempValue;

    if (editField === "avatarUrl") {
      if (tempValue instanceof File) {
        updated.profile.avatarUrl = avatarPreview;
      } else {
        updated.profile.avatarUrl = tempValue;
      }
    }

    setAdmin(updated);
    cancelEdit();
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} />
        <p className="mt-3 fs-4 text-muted">Đang tải...</p>
      </div>
    );

  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (!admin)
    return (
      <Container className="py-5">
        <Alert variant="warning">Không tìm thấy thông tin admin</Alert>
      </Container>
    );

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center mb-4">
        <FiUser size={40} className="text-primary me-3" />
        <div>
          <h2 className="mb-0 fw-bold">{admin.profile.fullName}</h2>
          <small className="text-muted">Mã Admin: {admin._id}</small>
        </div>
      </div>

      <Row>
        <Col lg={4}>
          <Card className="shadow-sm border-0 text-center pt-4 pb-4">

            {/* Avatar */}
            <div className="text-center mb-4">
              <Image
                src={avatarPreview || admin.profile.avatarUrl || "https://i.pravatar.cc/300"}
                roundedCircle
                width={200}
                height={200}
                className="shadow border border-3 border-white"
              />

              {/* Upload avatar */}
              <div className="mt-3">
                {editField === "avatarUrl" ? (
                  <>
                    <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
                    <div className="d-flex gap-2 justify-content-center mt-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    className="mt-2"
                    onClick={() => startEdit("avatarUrl", admin.profile.avatarUrl)}
                  >
                    <FiCamera /> Đổi ảnh
                  </Button>
                )}
              </div>
            </div>

            {/* Info List */}
            <ListGroup variant="flush">

              {/* FullName */}
              <ListGroup.Item className="py-3 text-start">
                <small className="text-muted">Họ và tên</small>
                {editField === "fullName" ? (
                  <>
                    <Form.Control className="mt-1" value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)} />
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-between fw-bold mt-1">
                    {admin.profile.fullName}
                    <FiEdit3 role="button" className="text-primary"
                      onClick={() => startEdit("fullName", admin.profile.fullName)} />
                  </div>
                )}
              </ListGroup.Item>

              {/* Gender */}
              <ListGroup.Item className="py-3 text-start">
                <small className="text-muted">Giới tính</small>
                {editField === "gender" ? (
                  <>
                    <Form.Select
                      className="mt-1"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    >
                      <option value="">—</option>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </Form.Select>
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-between fw-bold mt-1">
                    {admin.profile.gender === "Male"
                      ? "Nam"
                      : admin.profile.gender === "Female"
                        ? "Nữ"
                        : "Khác"}
                    <FiEdit3 role="button" className="text-primary"
                      onClick={() => startEdit("gender", admin.profile.gender)} />
                  </div>
                )}
              </ListGroup.Item>

              {/* Email */}
              <ListGroup.Item className="py-3 text-start">
                <small className="text-muted">Email</small>
                {editField === "email" ? (
                  <>
                    <Form.Control
                      className="mt-1"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-between fw-bold mt-1">
                    {admin.email}
                    <FiEdit3 role="button" className="text-primary"
                      onClick={() => startEdit("email", admin.email)} />
                  </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;
