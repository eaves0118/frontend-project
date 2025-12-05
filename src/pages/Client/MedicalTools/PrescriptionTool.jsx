// src/pages/Doctor/MedicalTools/PrescriptionTool.jsx
import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Table,
  Badge,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { FiFileText, FiPlus, FiTrash2, FiPrinter } from "react-icons/fi";

const PrescriptionTool = () => {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const printPrescription = () => {
    window.print();
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center mb-4">
        <FiFileText size={36} className="text-primary me-3" />
        <h2 className="mb-0 fw-bold">Tạo Đơn Thuốc</h2>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Thông tin bệnh nhân & Chẩn đoán</h5>
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Label>Mã bệnh nhân</Form.Label>
                  <Form.Control
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="VD: U001"
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                  />
                </Col>
                <Col md={12}>
                  <Form.Label>Chẩn đoán</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Viêm họng cấp, sốt nhẹ..."
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow border-0 mt-4">
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Đơn thuốc</h5>
              <Button size="sm" variant="light" onClick={addMedication}>
                <FiPlus /> Thêm thuốc
              </Button>
            </Card.Header>
            <Card.Body>
              <Table bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>STT</th>
                    <th>Tên thuốc</th>
                    <th>Liều lượng</th>
                    <th>Tần suất</th>
                    <th>Thời gian</th>
                    <th>Hướng dẫn</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Form.Control
                          value={med.name}
                          onChange={(e) => updateMedication(index, "name", e.target.value)}
                          placeholder="Paracetamol 500mg"
                        />
                      </td>
                      <td>
                        <Form.Control
                          value={med.dosage}
                          onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                          placeholder="1 viên"
                        />
                      </td>
                      <td>
                        <Form.Control
                          value={med.frequency}
                          onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                          placeholder="3 lần/ngày"
                        />
                      </td>
                      <td>
                        <Form.Control
                          value={med.duration}
                          onChange={(e) => updateMedication(index, "duration", e.target.value)}
                          placeholder="5 ngày"
                        />
                      </td>
                      <td>
                        <Form.Control
                          value={med.instructions}
                          onChange={(e) => updateMedication(index, "instructions", e.target.value)}
                          placeholder="Uống sau ăn"
                        />
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => removeMedication(index)}
                        >
                          <FiTrash2 />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="mt-4 text-end">
            <Button variant="primary" size="lg" onClick={printPrescription}>
              <FiPrinter className="me-2" />
              In đơn thuốc
            </Button>
          </div>
        </Col>

        <Col lg={4}>
          <Alert variant="info" className="h-100 d-flex align-items-center">
            <div>
              <h5>Đơn thuốc sẽ được:</h5>
              <ul className="mb-0">
                <li>Gửi tự động cho bệnh nhân qua email</li>
                <li>Lưu vào hồ sơ y tế</li>
                <li>Có mã QR để quét tại nhà thuốc</li>
              </ul>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default PrescriptionTool;