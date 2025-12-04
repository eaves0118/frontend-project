import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Alert, Table, Image, Form, Button } from "react-bootstrap";
import { FiUser, FiPhone, FiMail, FiCalendar, FiAlertTriangle, FiHeart, FiEdit3, FiCheck, FiX, FiCamera } from "react-icons/fi";
import authApi from "@/services/api";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  // GỌI API LẤY THÔNG TIN BỆNH NHÂN
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getMe();
        setPatient(res.data);
      } catch (err) {
        console.error("Lỗi tải hồ sơ:", err);
        setError("Không thể tải được thông tin bệnh nhân");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ĐỊNH DẠNG NGÀY THÁNG
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // BẮT ĐẦU CHỈNH SỬA
  const startEdit = (field, value) => {
    setEditField(field);
    setTempValue(value || "");
  };

  // HỦY CHỈNH SỬA
  const cancelEdit = () => {
    setEditField(null);
    setTempValue("");
  };

  // LƯU CHỈNH SỬA VÀO STATE
  const saveEdit = () => {
    const updated = { ...patient };

    switch (editField) {
      case "fullName":
        updated.profile.fullName = tempValue;
        break;
      case "dateOfBirth":
        updated.profile.dateOfBirth = tempValue;
        break;
      case "gender":
        updated.profile.gender = tempValue;
        break;
      case "avatarUrl":
        updated.profile.avatarUrl = tempValue;
        break;
      case "email":
        updated.email = tempValue;
        break;
      case "phone":
        const phoneContact = updated.contacts.find((c) => c.type === "phone");
        if (phoneContact) {
          phoneContact.value = tempValue;
        } else {
          updated.contacts.push({ type: "phone", value: tempValue, isPrimary: true });
        }
        break;
      default:
        break;
    }

    setPatient(updated);
    setEditField(null);
  };

  // LOADING
  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} />
        <p className="mt-3 fs-4 text-muted">Đang tải hồ sơ...</p>
      </div>
    );

  // LỖI
  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );

  // KHÔNG TÌM THẤY BỆNH NHÂN
  if (!patient)
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          Không tìm thấy thông tin bệnh nhân
        </Alert>
      </Container>
    );

  const phoneValue = patient.contacts.find((c) => c.type === "phone")?.value;

  return (
    <Container className="py-5">
      {/* HEADER */}
      <div className="d-flex align-items-center mb-5">
        <FiUser size={40} className="text-primary me-3" />
        <div>
          <h2 className="mb-0 fw-bold">{patient.profile.fullName}</h2>
          <small className="text-muted">Mã bệnh nhân: {patient._id}</small>
        </div>
      </div>

      <Row className="g-4">
        {/* CỘT TRÁI */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 text-center pt-5">
            {/* Avatar */}
            <div className="text-center mb-4">
              <Image
                src={avatarPreview || patient.profile.avatarUrl || "https://i.pravatar.cc/300"}
                roundedCircle
                width={200}
                height={200}
                className="shadow border border-3 border-white"
              />

              {/* Nút đổi avatar */}
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="primary"
                  className="mt-2"
                  onClick={() => document.getElementById("avatarUploadInput").click()}
                >
                  <FiCamera /> Đổi ảnh
                </Button>

                {/* Input file hidden */}
                <input
                  id="avatarUploadInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      // Hiển thị ảnh preview ngay lập tức
                      setAvatarPreview(reader.result);

                      // Đưa vào tempValue để SaveEdit dùng
                      setTempValue(reader.result);

                      // Bật chế độ edit avatar
                      startEdit("avatarUrl", reader.result);
                    };

                    reader.readAsDataURL(file);
                  }}
                />
              </div>

              {/* Nếu đang edit avatar thì hiện nút Lưu + Hủy */}
              {editField === "avatarUrl" && (
                <div className="mt-3 d-flex justify-content-center gap-2">
                  <Button size="sm" variant="success" onClick={saveEdit}>
                    <FiCheck /> Lưu
                  </Button>
                  <Button size="sm" variant="secondary" onClick={cancelEdit}>
                    <FiX /> Hủy
                  </Button>
                </div>
              )}
            </div>
            <ListGroup variant="flush">
              {/* Họ tên */}
              <ListGroup.Item className="py-3 text-start">
                <small className="text-muted">Họ và tên</small>
                {editField === "fullName" ? (
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
                  <div className="fw-bold d-flex justify-content-between align-items-center mt-1">
                    {patient.profile.fullName}
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("fullName", patient.profile.fullName)}
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Ngày sinh */}
              <ListGroup.Item className="py-3 text-start">
                <small className="text-muted">Ngày sinh</small>
                {editField === "dateOfBirth" ? (
                  <>
                    <Form.Control
                      type="date"
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
                  <div className="fw-bold d-flex justify-content-between align-items-center mt-1">
                    {formatDate(patient.profile.dateOfBirth)}
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() =>
                        startEdit("dateOfBirth", patient.profile.dateOfBirth?.slice(0, 10))
                      }
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Giới tính */}
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
                  <div className="fw-bold d-flex justify-content-between align-items-center mt-1">
                    {patient.profile.gender === "Male"
                      ? "Nam"
                      : patient.profile.gender === "Female"
                        ? "Nữ"
                        : "Khác"}
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("gender", patient.profile.gender)}
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Số điện thoại */}
              <ListGroup.Item className="py-3 text-start">
                <small className="text-muted">Điện thoại</small>
                {editField === "phone" ? (
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
                  <div className="fw-bold d-flex justify-content-between align-items-center mt-1">
                    {phoneValue || "Chưa cập nhật"}
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("phone", phoneValue)}
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Email */}
              <ListGroup.Item className="py-3 text-start">
                <small className="text-muted">Email</small>
                {editField === "email" ? (
                  <>
                    <Form.Control
                      type="email"
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
                  <div className="fw-bold d-flex justify-content-between align-items-center mt-1">
                    {patient.email}
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("email", patient.email)}
                    />
                  </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* CỘT PHẢI – THÔNG TIN Y TẾ */}
        <Col lg={8}>
          {/* Cảnh báo dị ứng */}
          {patient.allergies?.length > 0 && (
            <Alert variant="danger" className="d-flex align-items-center p-4 mb-4 rounded-3 shadow">
              <FiAlertTriangle size={36} className="me-3 flex-shrink-0" />
              <div>
                <h4 className="mb-2 fw-bold">CẢNH BÁO DỊ ỨNG NGHIÊM TRỌNG</h4>
                {patient.allergies.map((a, i) => (
                  <span key={i} className="fw-bold fs-5 text-white">
                    {a.name} → {a.reaction}
                    {i < patient.allergies.length - 1 && " • "}
                  </span>
                ))}
                <br />
                <small className="opacity-90">{patient.allergies[0].notes}</small>
              </div>
            </Alert>
          )}

          {/* Bệnh lý */}
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-4 d-flex align-items-center text-primary fw-bold">
                <FiHeart className="me-3 text-danger" size={26} />
                Bệnh lý đang theo dõi
              </h5>

              {patient.medicalConditions?.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th>Bệnh</th>
                      <th>Chẩn đoán từ</th>
                      <th>Phác đồ điều trị</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.medicalConditions.map((c, i) => (
                      <tr key={i}>
                        <td className="fw-bold">{c.name}</td>
                        <td>{formatDate(c.diagnosedDate)}</td>
                        <td>{c.treatmentPlan}</td>
                        <td><small>{c.notes}</small></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">Không có bệnh lý mạn tính</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientProfile;
