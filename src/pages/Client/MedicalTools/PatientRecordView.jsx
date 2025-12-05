// src/pages/Doctor/MedicalTools/PatientRecordView.jsx
import React, { useState } from "react";
import {
  Container,
  Card,
  Table,
  Badge,
  Alert,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { FiSearch, FiAlertTriangle, FiHeart, FiFileText } from "react-icons/fi";

const PatientRecordView = () => {
  const [searchId, setSearchId] = useState("");
  const [patient, setPatient] = useState(null);

  const mockPatients = {
    U001: {
      name: "Nguyễn Văn A",
      dob: "15/05/1990",
      gender: "Nam",
      allergies: ["Penicillin", "Hải sản"],
      conditions: [
        { name: "Tiểu đường type 2", diagnosed: "15/03/2020", notes: "HbA1c: 7.2%" },
        { name: "Tăng huyết áp", diagnosed: "10/08/2021", notes: "140/90 mmHg" },
      ],
      recentVisit: "20/03/2025 - Video Call - Viêm họng cấp",
    },
  };

  const handleSearch = () => {
    setPatient(mockPatients[searchId] || null);
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center mb-4">
        <FiFileText size={36} className="text-primary me-3" />
        <h2 className="mb-0 fw-bold">Tra cứu Hồ sơ Y tế</h2>
      </div>

      <Card className="shadow border-0 mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <Form.Control
                size="lg"
                placeholder="Nhập mã bệnh nhân (VD: U001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </Col>
            <Col md={4}>
              <Button size="lg" variant="primary" onClick={handleSearch} className="w-100">
                <FiSearch className="me-2" />
                Tra cứu
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {!patient && searchId && (
        <Alert variant="warning" className="text-center">
          Không tìm thấy bệnh nhân với mã <strong>{searchId}</strong>
        </Alert>
      )}

      {patient && (
        <>
          <Card className="shadow border-0 mb-4">
            <Card.Header className="bg-info text-white">
              <h4 className="mb-0">Thông tin bệnh nhân</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Họ tên:</strong> {patient.name}</p>
                  <p><strong>Ngày sinh:</strong> {patient.dob}</p>
                  <p><strong>Giới tính:</strong> {patient.gender}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Lần khám gần nhất:</strong></p>
                  <Badge bg="success" className="fs-6">{patient.recentVisit}</Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {patient.allergies.length > 0 && (
            <Alert variant="danger" className="d-flex align-items-center p-4 mb-4">
              <FiAlertTriangle size={36} className="me-3" />
              <div>
                <h4 className="mb-2 fw-bold">DỊ ỨNG NGHIÊM TRỌNG</h4>
                <div className="fs-5">
                  {patient.allergies.map((a, i) => (
                    <Badge key={i} bg="light" text="dark" className="me-2 fs-6">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            </Alert>
          )}

          <Card className="shadow border-0">
            <Card.Header className="bg-danger text-white">
              <h5 className="mb-0">
                <FiHeart className="me-2" />
                Bệnh lý mạn tính
              </h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Bệnh</th>
                    <th>Chẩn đoán từ</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.conditions.map((c, i) => (
                    <tr key={i}>
                      <td className="fw-bold">{c.name}</td>
                      <td>{c.diagnosed}</td>
                      <td><em>{c.notes}</em></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default PatientRecordView;