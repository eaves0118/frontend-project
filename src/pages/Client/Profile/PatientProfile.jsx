// src/pages/Client/Profile/PatientProfile.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Alert,
  Table,
  Image,
  Form, // Thêm Form
  Button, // Thêm Button
} from "react-bootstrap";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiCalendar,
  FiAlertTriangle,
  FiHeart,
  FiEdit3, // Icon chỉnh sửa
  FiCheck, // Icon Lưu
  FiX, // Icon Hủy
  FiCamera, // Icon camera cho Avatar
} from "react-icons/fi";

// Dữ liệu tĩnh
const STATIC_PATIENT_DATA = {
    _id: "U001",
    email: "patient01@email.com",
    profile: {
      fullName: "Nguyễn Văn A",
      dateOfBirth: "1990-05-15", // yyyy-mm-dd
      gender: "Male",
      avatarUrl: "https://i.pravatar.cc/500?img=58",
    },
    contacts: [
      { type: "phone", value: "0901234567", isPrimary: true },
      { type: "email", value: "patient01@email.com", isPrimary: true },
    ],
    medicalConditions: [
      {
        name: "Tiểu đường type 2",
        diagnosedDate: "2020-03-15",
        treatmentPlan: "Metformin 500mg x 2 lần/ngày + chế độ ăn kiêng",
        notes: "HbA1c gần nhất: 7.2% (03/2025)",
      },
    ],
    allergies: [
      {
        name: "Penicillin",
        severity: "high",
        reaction: "Sốc phản vệ",
        notes: "Cấm tuyệt đối mọi chế phẩm chứa penicillin",
      },
    ],
};

const STATIC_APPOINTMENTS_DATA = [
    {
      _id: "A001",
      appointmentDate: "2025-03-20",
      type: "video",
      symptoms: "Ho khan, sốt nhẹ, mệt mỏi",
      status: "completed",
      doctorNotes: "Viêm đường hô hấp trên. Nghỉ ngơi, uống nhiều nước.",
      prescriptions: [
        { medicationName: "Paracetamol 500mg", dosage: "1 viên", frequency: "3 lần/ngày", duration: "5 ngày", instructions: "Uống sau ăn" },
      ],
    },
];

const PatientProfile = () => {
  const [patient, setPatient] = useState(STATIC_PATIENT_DATA);
  const [appointments] = useState(STATIC_APPOINTMENTS_DATA);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // State cho chức năng chỉnh sửa
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null); // Để hiển thị ảnh mới trước khi lưu

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
  const startEdit = (field, currentValue) => {
    setEditField(field);
    setTempValue(currentValue || "");
    setAvatarPreview(null);
  };

  // HỦY CHỈNH SỬA
  const cancelEdit = () => {
    setEditField(null);
    setTempValue("");
    setAvatarPreview(null);
  };

  // LƯU CHỈNH SỬA (Chỉ cập nhật state nội bộ)
  const saveEdit = () => {
    const updated = { ...patient };
    
    switch (editField) {
      case "dateOfBirth":
        updated.profile.dateOfBirth = tempValue;
        break;
      case "gender":
        updated.profile.gender = tempValue;
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
      case "avatarUrl":
        // Sau khi upload xong, cập nhật URL vào profile
        updated.profile.avatarUrl = avatarPreview || updated.profile.avatarUrl; 
        setAvatarPreview(null);
        break;
      default:
        break;
    }

    setPatient(updated);
    setEditField(null);
    setTempValue("");
  };

  // Xử lý thay đổi Avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      // Lưu tạm ảnh preview
      // Lưu thật sự xảy ra khi nhấn nút Lưu ảnh (saveEdit)
    };
    reader.readAsDataURL(file);
  };

  const phoneValue = patient.contacts.find((c) => c.type === "phone")?.value;
  const patientAllergies = patient.allergies || [];
  const patientConditions = patient.medicalConditions || [];

  return (
    <Container className="py-5 patient-profile">
      {/* HEADER */}
      <div className="d-flex align-items-center mb-5">
        <FiUser size={40} className="text-primary me-3" />
        <div>
          <h2 className="mb-0 fw-bold">{patient.profile.fullName}</h2>
          <small className="text-muted">Mã bệnh nhân: {patient._id}</small>
        </div>
      </div>

      <Row className="g-5">
        {/* CỘT TRÁI - THÔNG TIN CÁ NHÂN & AVATAR */}
        <Col lg={4}>
          <Card className="shadow border-0 text-center pt-5 pb-3">
            {/* AVATAR VÀ NÚT CHỈNH SỬA */}
            <div className="text-center mb-5">
              <div className="position-relative d-inline-block">
                <Image
                  src={avatarPreview || patient.profile.avatarUrl}
                  roundedCircle
                  width={220}
                  height={220}
                  className="shadow-lg border border-5 border-white"
                  style={{ objectFit: 'cover' }}
                  alt="Avatar"
                />
                {editField !== "avatarUrl" && (
                  <Button
                    size="sm"
                    variant="primary"
                    className="position-absolute bottom-0 end-0 translate-middle"
                    style={{ borderRadius: "50%", width: "48px", height: "48px" }}
                    onClick={() => startEdit("avatarUrl", patient.profile.avatarUrl)}
                  >
                    <FiCamera size={20} />
                  </Button>
                )}
              </div>

              {editField === "avatarUrl" && (
                <div className="mt-4 px-4">
                  <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
                  <div className="mt-3">
                    <Button variant="success" onClick={saveEdit} disabled={!avatarPreview}>
                      <FiCheck /> Lưu ảnh
                    </Button>{" "}
                    <Button variant="secondary" onClick={cancelEdit}>
                      <FiX /> Hủy
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <h3 className="mb-4">{patient.profile.fullName}</h3>
            {/* Đã bỏ: Badge "Bệnh nhân thường quy" */}

            <ListGroup variant="flush">
              
              {/* Ngày sinh */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <FiCalendar className="me-3 text-primary" />
                  <strong>Ngày sinh:</strong>
                </div>
                {editField === "dateOfBirth" ? (
                  <div className="d-flex flex-column align-items-end">
                    <Form.Control
                      type="date"
                      size="sm"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{formatDate(patient.profile.dateOfBirth)}</span>
                    <FiEdit3 role="button" className="text-primary" onClick={() => startEdit("dateOfBirth", patient.profile.dateOfBirth)} />
                  </div>
                )}
              </ListGroup.Item>

              {/* Giới tính */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <FiUser className="me-3 text-info" />
                  <strong>Giới tính:</strong>
                </div>
                {editField === "gender" ? (
                  <div className="d-flex flex-column align-items-end">
                    <Form.Select size="sm" value={tempValue} onChange={(e) => setTempValue(e.target.value)}>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </Form.Select>
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{patient.profile.gender === "Male" ? "Nam" : "Nữ"}</span>
                    <FiEdit3 role="button" className="text-primary" onClick={() => startEdit("gender", patient.profile.gender)} />
                  </div>
                )}
              </ListGroup.Item>
              
              {/* Điện thoại */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <FiPhone className="me-3 text-success" />
                  <strong>Điện thoại:</strong>
                </div>
                {editField === "phone" ? (
                  <div className="d-flex flex-column align-items-end">
                    <Form.Control 
                      size="sm" 
                      value={tempValue} 
                      onChange={(e) => setTempValue(e.target.value)} 
                      placeholder="09xxxxxxx"
                    />
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{phoneValue}</span>
                    <FiEdit3 role="button" className="text-primary" onClick={() => startEdit("phone", phoneValue)} />
                  </div>
                )}
              </ListGroup.Item>

              {/* Email */}
              <ListGroup.Item className="py-3 d-flex justify-content-between align-items-center">
                <div>
                  <FiMail className="me-3 text-info" />
                  <strong>Email:</strong>
                </div>
                {editField === "email" ? (
                  <div className="d-flex flex-column align-items-end">
                    <Form.Control 
                      size="sm" 
                      type="email"
                      value={tempValue} 
                      onChange={(e) => setTempValue(e.target.value)} 
                      placeholder="email@domain.com"
                    />
                    <div className="mt-2 d-flex gap-2">
                      <Button size="sm" variant="success" onClick={saveEdit}><FiCheck /></Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}><FiX /></Button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-bold">{patient.email}</span>
                    <FiEdit3 role="button" className="text-primary" onClick={() => startEdit("email", patient.email)} />
                  </div>
                )}
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>

        {/* CỘT PHẢI - HỒ SƠ Y TẾ */}
        <Col lg={8}>
          {/* CẢNH BÁO DỊ ỨNG */}
          {patientAllergies.length > 0 && (
            <Alert variant="danger" className="d-flex align-items-center p-4 mb-4 rounded-4 shadow-lg alert-danger-custom">
              <FiAlertTriangle size={42} className="me-4 flex-shrink-0 text-white" />
              <div>
                <h4 className="mb-3 fw-bold text-white">CẢNH BÁO DỊ ỨNG NGHIÊM TRỌNG</h4>
                <div className="fs-5 fw-bold text-warning">
                  {patientAllergies.map((a, i) => (
                    <span key={i}>
                      {a.name} → {a.reaction}
                      {i < patientAllergies.length - 1 && " • "}
                    </span>
                  ))}
                </div>
                <small className="text-white opacity-90 fst-italic">
                  {patientAllergies[0].notes}
                </small>
              </div>
            </Alert>
          )}

          {/* BỆNH LÝ ĐANG THEO DÕI */}
          <Card className="shadow border-0 mb-4">
            <Card.Body>
              <h5 className="mb-4 d-flex align-items-center text-primary fw-bold">
                <FiHeart className="me-3 text-danger" size={28} />
                Bệnh lý đang theo dõi
              </h5>
              {patientConditions.length > 0 ? (
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
                    {patientConditions.map((c, i) => (
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
                <Alert variant="info" className="text-center py-2">Không có bệnh lý mạn tính được ghi nhận.</Alert>
              )}
            </Card.Body>
          </Card>

          {/* LỊCH SỬ KHÁM & ĐƠN THUỐC */}
          <Card className="shadow border-0">
            <Card.Body>
              <h5 className="mb-4 d-flex align-items-center text-primary fw-bold">
                <FiCalendar className="me-3" size={28} />
                Lịch sử khám bệnh
              </h5>
              {appointments.length > 0 ? (
                <>
                  <Table bordered hover responsive>
                    <thead className="table-primary text-white">
                      <tr>
                        <th>Ngày khám</th>
                        <th>Loại</th>
                        <th>Triệu chứng</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appt) => (
                        <tr
                          key={appt._id}
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelectedAppointment(appt)}
                          className={selectedAppointment?._id === appt._id ? "table-info fw-bold" : ""}
                        >
                          <td><strong>{formatDate(appt.appointmentDate)}</strong></td>
                          <td>
                            <Badge bg={appt.type === "video" ? "info" : "success"}>
                              {appt.type === "video" ? "Video" : "Trực tiếp"}
                            </Badge>
                          </td>
                          <td>{appt.symptoms}</td>
                          <td>
                            <Badge bg={appt.status === "completed" ? "success" : "secondary"}>
                              {appt.status === "completed" ? "Hoàn thành" : "Hủy"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  {/* CHI TIẾT ĐƠN THUỐC & GHI CHÚ */}
                  {selectedAppointment && (
                    <Card className="mt-4 border-primary shadow">
                      <Card.Header className="bg-primary text-white fw-bold">
                        Chi tiết khám ngày {formatDate(selectedAppointment.appointmentDate)}
                      </Card.Header>
                      <Card.Body>
                        <p className="mb-3"><strong>Ghi chú bác sĩ:</strong> {selectedAppointment.doctorNotes}</p>
                        <p className="text-danger fw-bold mt-4">ĐƠN THUỐC</p>
                        {selectedAppointment.prescriptions.map((p, i) => (
                          <div key={i} className="border-start border-danger border-4 ps-3 py-2 mb-2 bg-light">
                            <strong className="text-danger">{p.medicationName}</strong><br />
                            <small>
                              Liều: {p.dosage} • Tần suất: {p.frequency} • Thời gian: {p.duration}<br />
                              <em>{p.instructions}</em>
                            </small>
                          </div>
                        ))}
                      </Card.Body>
                      <Card.Footer className="text-end">
                        <Button variant="outline-secondary" size="sm" onClick={() => setSelectedAppointment(null)}>
                          Đóng
                        </Button>
                      </Card.Footer>
                    </Card>
                  )}
                </>
              ) : (
                <Alert variant="info" className="text-center py-2">Không có lịch sử khám bệnh hoàn thành.</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientProfile;