import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
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
    <Container className="container">
      <Row className="">
        <Col className='formular' md={6}>
          <div className="formular-butoane">
            <Button className="buton" onClick={handleShowLoginForm}>
              Autentificare
            </Button>
            <Button className="buton" onClick={handleShowCreateForm}>
              Creează Cont
            </Button>
          </div>

          {showLoginForm && (
            <Form className="mt-4" onSubmit={handleLogin}>
              <Form.Group controlId="formEmailLogin">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Introdu adresa de email"
                  required
                  name="email" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.email} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPasswordLogin">
                <Form.Label>Parolă</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Introdu parola"
                  required
                  name="password" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.password} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Autentificare
              </Button>
            </Form>
          )}

          {showCreateForm && (
            <Form className="mt-4" onSubmit={handleCreateAccount}>
              <Form.Group controlId="formFirstName">
                <Form.Label>Nume</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introdu numele"
                  required
                  name="firstName" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.firstName} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Prenume</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introdu prenumele"
                  required
                  name="lastName" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.lastName} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmailCreate">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Introdu adresa de email"
                  required
                  name="email" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.email} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Telefon</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Introdu numărul de telefon"
                  required
                  name="phone" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.phone} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPasswordCreate">
                <Form.Label>Parolă</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Introdu parola"
                  required
                  name="password" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.password} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button variant="danger" type="button" className="mr-2" onClick={handleShowLoginForm}>
                  Anulează
                </Button>
                <Button variant="success" type="submit">
                  Creează Cont
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Autentificare;
