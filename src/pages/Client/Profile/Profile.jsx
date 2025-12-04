import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Alert, Table, Image } from "react-bootstrap";
import { FiUser, FiPhone, FiMail, FiCalendar, FiAlertTriangle, FiHeart } from "react-icons/fi";
import authApi from "@/services/api";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authApi.getMe(); // Backend trả đúng cấu trúc như seed
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

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} />
        <p className="mt-3 fs-4 text-muted">Đang tải hồ sơ...</p>
      </div>
    );

  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">{error}</Alert>
      </Container>
    );

  if (!patient)
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          Không tìm thấy thông tin bệnh nhân
        </Alert>
      </Container>
    );

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="d-flex align-items-center mb-5">
        <FiUser size={40} className="text-primary me-3" />
        <div>
          <h2 className="mb-0 fw-bold">{patient.profile.fullName}</h2>
          <small className="text-muted">Mã BN: {patient._id}</small>
        </div>
      </div>

      <Row className="g-4">
        {/* Cột trái - Avatar + Info */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 text-center pt-5">
            <Image
              src={patient.profile.avatarUrl.startsWith("http") ? patient.profile.avatarUrl : "https://i.pravatar.cc/400"}
              roundedCircle
              width={180}
              height={180}
              className="mb-4 shadow border border-5 border-white"
              alt="Avatar"
            />
            <h4>{patient.profile.fullName}</h4>
            <Badge bg="info" pill className="px-4 py-2 fs-6 mb-4">
              Bệnh nhân thường quy
            </Badge>

            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex align-items-center py-3">
                <FiCalendar className="me-3 text-primary fs-5" />
                <div className="text-start w-100">
                  <small className="text-muted">Ngày sinh</small>
                  <div className="fw-bold">{formatDate(patient.profile.dateOfBirth)}</div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center py-3">
                <FiPhone className="me-me-3 text-success fs-5" />
                <div className="text-start w-100">
                  <small className="text-muted">Điện thoại</small>
                  <div className="fw-bold">
                    {patient.contacts.find(c => c.type === "phone")?.value || "Chưa cập nhật"}
                  </div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex align-items-center py-3">
                <FiMail className="me-3 text-info fs-5" />
                <div className="text-start w-100">
                  <small className="text-muted">Email</small>
                  <div className="fw-bold">{patient.email}</div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Cột phải - Thông tin y tế */}
        <Col lg={8}>
          {/* Cảnh báo dị ứng */}
          {patient.allergies?.length > 0 && (
            <Alert variant="danger" className="d-flex align-items-center p-4 mb-4 rounded-3 shadow">
              <FiAlertTriangle size={36} className="me-me-3 flex-shrink-0" />
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

          {/* Bệnh lý mạn tính */}
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