import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Autentificare.scss"

const Autentificare = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
    });

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleShowLoginForm = () => {
        setShowLoginForm(true);
        setShowCreateForm(false);
    };

    const handleShowCreateForm = () => {
        setShowLoginForm(false);
        setShowCreateForm(true);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = formData; // Accesează valorile din formData
        console.log('Autentificare cu:', email, password);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, phone, password } = formData; // Accesează valorile din formData
        console.log('Creare cont cu:', firstName, lastName, email, phone, password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Container className="container d-flex flex-row justify-content-between align-items-center">
            <Row className='rows d-flex flex-row align-items-center'>
                <Col className='formular d-flex flex-column justify-content-between align-items-center' md={6}>
                    <div className="formular-butoane d-flex flex-row justify-content-between align-items-center">
                        <Button className="buton" onClick={handleShowLoginForm}>
                            Autentificare
                        </Button>
                        <Button className="buton" onClick={handleShowCreateForm}>
                            Creează Cont
                        </Button>
                    </div>

                    {showLoginForm && (
                        <Form className="formular2 mt-4" onSubmit={handleLogin}>

                            <Form.Group className='camp d-flex flex-row justify-content-between align-items-center' controlId="formEmailLogin">
                                <Col className='d-flex flex-row justify-content-between align-items-center'>
                                    <Image className='camp1 p-2' src="images/user.png" />
                                    <Form.Control className='camp2 p-2'
                                        type="email"
                                        placeholder="Introdu adresa de email"
                                        required
                                        name="email" // Adaugă name pentru a asocia cu cheia din formData
                                        value={formData.email} // Adaugă value pentru a sincroniza cu starea formData
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group className='camp d-flex flex-row justify-content-between align-items-center' controlId="formPasswordLogin">
                                <Col className='d-flex flex-row justify-content-between align-items-center'>
                                    <Image className='camp1 p-2' src="images/key.png" />
                                    <Form.Control className='camp2 p-2'
                                        type="password"
                                        placeholder="Introdu parola"
                                        required
                                        name="password" // Adaugă name pentru a asocia cu cheia din formData
                                        value={formData.password} // Adaugă value pentru a sincroniza cu starea formData
                                        onChange={handleInputChange}
                                    />
                                </Col>
                            </Form.Group>

                            <Button className='buton2'>
                                Autentificare
                            </Button>
                        </Form>
                    )}

                    {showCreateForm && (
                        <Form className="formular2 mt-4" onSubmit={handleCreateAccount}>
                            <Form.Group className='w-100 d-flex flex-row justify-content-between align-items-center m-2' controlId="formFirstName">
                                <Form.Control className='d-flex flex-row justify-content-between align-items-center'
                                    type="text"
                                    placeholder="Introdu numele"
                                    required
                                    name="firstName" // Adaugă name pentru a asocia cu cheia din formData
                                    value={formData.firstName} // Adaugă value pentru a sincroniza cu starea formData
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className='w-100 d-flex flex-row justify-content-between align-items-center m-2' controlId="formLastName">
                                <Form.Control className='d-flex flex-row justify-content-between align-items-center'
                                    type="text"
                                    placeholder="Introdu prenumele"
                                    required
                                    name="lastName" // Adaugă name pentru a asocia cu cheia din formData
                                    value={formData.lastName} // Adaugă value pentru a sincroniza cu starea formData
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className='w-100 d-flex flex-row justify-content-between align-items-center m-2' controlId="formEmailCreate">
                                <Form.Control className='d-flex flex-row justify-content-between align-items-center'
                                    type="email"
                                    placeholder="Introdu adresa de email"
                                    required
                                    name="email" // Adaugă name pentru a asocia cu cheia din formData
                                    value={formData.email} // Adaugă value pentru a sincroniza cu starea formData
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className='w-100 d-flex flex-row justify-content-between align-items-center m-2' controlId="formPhone">
                                <Form.Control className='d-flex flex-row justify-content-between align-items-center'
                                    type="tel"
                                    placeholder="Introdu numărul de telefon"
                                    required
                                    name="phone" // Adaugă name pentru a asocia cu cheia din formData
                                    value={formData.phone} // Adaugă value pentru a sincroniza cu starea formData
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className='w-100 d-flex flex-row justify-content-between align-items-center m-2' controlId="formPasswordCreate">
                                <Form.Control className='d-flex flex-row justify-content-between align-items-center'
                                    type="password"
                                    placeholder="Introdu parola"
                                    required
                                    name="password" // Adaugă name pentru a asocia cu cheia din formData
                                    value={formData.password} // Adaugă value pentru a sincroniza cu starea formData
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <div className="w-100 h-10 d-flex flex-row justify-content-center align-items-center m-2">
                                <Button className="buton4" onClick={handleShowLoginForm}>
                                    Anulează
                                </Button>
                                <Button className='buton3'>
                                    Creează Cont
                                </Button>
                            </div>
                        </Form>
                    )}
                </Col>
            </Row>

            <Row className='rows d-flex flex-row align-items-center'>
                <Image className='poza p-2' src="./images/buget.png" />
            </Row>
        </Container>
    );
};

export default Autentificare;
