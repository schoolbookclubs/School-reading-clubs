import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";
export default function ChangeSupervisorPassword() {
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                "https://school-book-clubs-backend.vercel.app/api/Supervisor/generate-verification-code",
                { email }
            );
            setModalMessage(response.data.message);
            setIsSuccess(true);
            setShowModal(true);
            setTimeout(() => {
                navigate("/ForgotPasswordsupervisor");
            }, 2000);
        } catch (error) {
            setModalMessage(
                error.response?.data?.message || "حدث خطأ أثناء إرسال رمز التحقق"
            );
            setIsSuccess(false);
            setShowModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (isSuccess) {
            navigate("/ForgetPasswordsupervisor");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow-lg border-0" style={{ borderRadius: '15px' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>إعادة تعيين كلمة المرور</h2>
                            <Form onSubmit={handleSubmit} dir="rtl">
                                <Form.Group className="mb-4">
                                    <Form.Label style={{ color: '#34495e' }}>البريد الإلكتروني</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="أدخل بريدك الإلكتروني"
                                        required
                                        className="py-2"
                                        style={{ borderRadius: '10px' }}
                                    />
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="w-100 py-2"
                                    style={{ 
                                        borderRadius: '10px',
                                        background: '#3498db',
                                        transition: 'all 0.3s ease'
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            جاري الإرسال...
                                        </>
                                    ) : (
                                        'إرسال رمز التحقق'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                centered 
                dir="rtl"
                className="custom-modal"
            >
                <Modal.Header style={{
                    background: isSuccess ? '#2ecc71' : '#e74c3c',
                    color: 'white',
                    borderBottom: 'none',
                    borderRadius: '15px 15px 0 0',
                    padding: '1.5rem'
                }}>
                    <Modal.Title>
                        {isSuccess ? "✓ نجاح" : "⚠ خطأ"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    padding: '2rem',
                    fontSize: '1.1rem',
                    textAlign: 'center'
                }}>
                    <p className={isSuccess ? "text-success" : "text-danger"}>
                        {modalMessage}
                    </p>
                </Modal.Body>
                <Modal.Footer style={{
                    borderTop: 'none',
                    padding: '1rem 2rem',
                    justifyContent: 'center'
                }}>
                    <Button 
                        variant={isSuccess ? "success" : "danger"} 
                        onClick={handleCloseModal}
                        style={{
                            borderRadius: '8px',
                            padding: '0.5rem 2rem',
                            width: '120px'
                        }}
                    >
                        إغلاق
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

}