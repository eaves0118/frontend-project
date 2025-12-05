import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Alert, Table, Image, Form, Button} from "react-bootstrap";
import { FiUser, FiPhone, FiMail, FiCalendar, FiAlertTriangle, FiHeart, FiEdit3, FiCheck, FiX, FiCamera} from "react-icons/fi";
import authApi from "@/services/api";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getMe(); // API thật
        setPatient(res.data);
      } catch (err) {
        console.error("Lỗi tải hồ sơ:", err);
        setError("Không thể tải thông tin bệnh nhân");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const startEdit = (field, value) => {
    setEditField(field);
    setTempValue(value || "");
  };

  const cancelEdit = () => {
    setEditField(null);
    setTempValue("");
    setAvatarPreview(null);
  };

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
        updated.profile.avatarUrl = avatarPreview || updated.profile.avatarUrl;
        setAvatarPreview(null);
        break;
      case "email":
        updated.email = tempValue;
        break;
      case "phone":
        const phoneContact = updated.contacts.find((c) => c.type === "phone");
        if (phoneContact) phoneContact.value = tempValue;
        else updated.contacts.push({ type: "phone", value: tempValue, isPrimary: true });
        break;
      default:
        break;
    }

    setPatient(updated);
    setEditField(null);
    setTempValue("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} />
        <p className="mt-4 fs-4 text-muted">Đang tải hồ sơ bệnh nhân...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center fs-4">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center fs-4">
          Không tìm thấy thông tin bệnh nhân
        </Alert>
      </Container>
    );
  }

  const phoneValue = patient.contacts?.find((c) => c.type === "phone")?.value || "Chưa cập nhật";

  return (
    <Container className="py-5">
      {/* HEADER */}
      <div className="d-flex align-items-center mb-5">
        <FiUser size={40} className="text-primary me-3" />
        <div>
          <h2 className="mb-0 fw-bold">{patient.profile?.fullName || "Chưa có tên"}</h2>
          <small className="text-muted">Mã bệnh nhân: {patient._id}</small>
        </div>
      </div>

      <Row className="g-5">
        {/* CỘT TRÁI – THÔNG TIN CÁ NHÂN */}
        <Col lg={4}>
          <Card className="shadow border-0 text-center pt-5">
            <div className="position-relative d-inline-block mb-4">
              <Image
                src={avatarPreview || patient.profile?.avatarUrl || "https://i.pravatar.cc/400"}
                roundedCircle
                width={220}
                height={220}
                className="shadow-lg border border-5 border-white"
                alt="Ảnh đại diện"
              />
              {!editField && (
                <Button
                  variant="primary"
                  size="lg"
                  className="position-absolute bottom-0 end-0 translate-middle-x"
                  style={{ borderRadius: "50%", width: "56px", height: "56px" }}
                  onClick={() => document.getElementById("avatarInput").click()}
                >
                  <FiCamera size={24} />
                </Button>
              )}
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
              {editField === "avatarUrl" && (
                <div className="mt-4">
                  <div className="d-flex justify-content-center gap-3">
                    <Button variant="success" onClick={saveEdit}>
                      <FiCheck /> Lưu ảnh
                    </Button>
                    <Button variant="secondary" onClick={cancelEdit}>
                      <FiX /> Hủy
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <h3 className="mb-4">{patient.profile?.fullName}</h3>
            <Badge bg="info" pill className="px-5 py-3 fs-5 mb-5">
              Bệnh nhân thường quy
            </Badge>

            <ListGroup variant="flush">
              {/* Họ tên */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong>Họ và tên</strong>
                </div>
                {editField === "fullName" ? (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      size="sm"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{patient.profile?.fullName}</span>
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("fullName", patient.profile?.fullName)}
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Ngày sinh */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <FiCalendar className="me-3 text-primary" />
                  <strong>Ngày sinh</strong>
                </div>
                {editField === "dateOfBirth" ? (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      type="date"
                      size="sm"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{formatDate(patient.profile?.dateOfBirth)}</span>
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("dateOfBirth", patient.profile?.dateOfBirth || "")}
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Giới tính */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <strong>Giới tính</strong>
                </div>
                {editField === "gender" ? (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Select
                      size="sm"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    >
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </Form.Select>
                    <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">
                      {patient.profile?.gender === "Male" ? "Nam" : patient.profile?.gender === "Female" ? "Nữ" : "Khác"}
                    </span>
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("gender", patient.profile?.gender)}
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Số điện thoại */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <FiPhone className="me-3 text-success" />
                  <strong>Điện thoại</strong>
                </div>
                {editField === "phone" ? (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      size="sm"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{phoneValue}</span>
                    <FiEdit3
                      role="button"
                      className="text-primary"
                      onClick={() => startEdit("phone", phoneValue)}
                    />
                  </div>
                )}
              </ListGroup.Item>

              {/* Email */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <FiMail className="me-3 text-info" />
                  <strong>Email</strong>
                </div>
                {editField === "email" ? (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      size="sm"
                      type="email"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{patient.email}</span>
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
          {/* CẢNH BÁO DỊ ỨNG – NỀN ĐỎ, CHỮ ĐEN, ICON ĐEN */}
          {patient.allergies?.length > 0 && (
            <Alert variant="danger" className="d-flex align-items-center p-4 mb-4 rounded-4 shadow">
              <FiAlertTriangle size={42} className="me-4 flex-shrink-0 text-dark" />
              <div>
                <h4 className="mb-3 fw-bold text-dark">CẢNH BÁO DỊ ỨNG NGHIÊM TRỌNG</h4>
                <div className="fs-5 fw-bold text-dark">
                  {patient.allergies.map((a, i) => (
                    <span key={i}>
                      {a.name} → {a.reaction}
                      {i < patient.allergies.length - 1 && " • "}
                    </span>
                  ))}
                </div>
                <br />
                <small className="text-dark opacity-90 fst-italic">
                  {patient.allergies[0].notes}
                </small>
              </div>
            </Alert>
          )}

          {/* BỆNH LÝ */}
          <Card className="shadow border-0">
            <Card.Body>
              <h5 className="mb-4 d-flex align-items-center text-primary fw-bold">
                <FiHeart className="me-3 text-danger" size={28} />
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
                        <td className="fw-bold text-danger">{c.name}</td>
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