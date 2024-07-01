import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import key from "../images/key.png";
import user from "../images/user.png";
import budget from "../images/template.jpg";
import axios from "axios"; // Importăm Axios pentru a face cererile HTTP
import { toast } from "react-toastify"; // Importăm funcționalitatea de toast
import "react-toastify/dist/ReactToastify.css"; // Importăm stilurile pentru toast
import "./Autentificare.scss";
import { useNavigate } from "react-router-dom";

const Autentificare = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const navigate = useNavigate();

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowCreateForm(false);
  };

  const handleShowCreateForm = () => {
    setShowLoginForm(false);
    setShowCreateForm(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      console.log("Autentificare cu succes:", response.data);
      toast.success("Autentificare cu succes!");
      localStorage.setItem("userId", response.data.userId);

      navigate("/home"); // Asigurați-vă că '/home' este ruta către pagina Home

      // Create script element for Botpress WebChat
      const script = document.createElement("script");
      script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
      script.async = true;

      // Create script element for initialization
      const script1 = document.createElement("script");
      script1.async = true;
      // Append the main script to the document body
      document.body.appendChild(script);

      // Add event listener for when the script is loaded
      script.onload = () => {
        script1.innerHTML = `window.botpressWebChat.init({
            composerPlaceholder: "Chat with support team",
            botConversationDescription: "Suntem aici pentru a va ajuta!",
            botId: "6338d451-2a60-4f6d-8873-9f9e99c21f11",
            hostUrl: "https://cdn.botpress.cloud/webchat/v1",
            messagingUrl: "https://messaging.botpress.cloud",
            clientId: "6338d451-2a60-4f6d-8873-9f9e99c21f11",
            webhookId: "ae368f40-95a8-4b51-8ed2-c28721b85ede",
            lazySocket: true,
            themeName: "prism",
            botName: "Suport",
            stylesheet:
              "https://webchat-styler-css.botpress.app/prod/code/eeb2ab87-23b6-4467-97ad-f0cf042b46e6/v542/style.css",
            frontendVersion: "v1",
            useSessionStorage: true,
            enableConversationDeletion: true,
            showPoweredBy: true,
            theme: "prism",
            themeColor: "#2563eb",
            allowedOrigins: [],
          });`;

        // Append the initialization script to the document body after the main script is loaded
        document.body.appendChild(script1);
      };

      // Clean up the scripts when the component is unmounted
      return () => {
        document.body.removeChild(script);
        if (script1.parentNode) {
          document.body.removeChild(script1);
        }
      };
    } catch (error) {
      console.error("Eroare la autentificare:", error.response.data.error);
      if (error.response.status === 401) {
        toast.error("Parolă greșită. Vă rugăm să încercați din nou.", {
          toastId: "parola-gresita",
        });
      } else if (error.response.status === 404) {
        toast.error("Utilizatorul nu a fost găsit.", {
          toastId: "user-not-found",
        });
      } else {
        toast.error("Eroare la autentificare.", {
          toastId: "eroare-autentificare",
        });
      }
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;
    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log("Cont creat cu succes:", response.data);
      // Afișează un mesaj de succes
      toast.success("Cont creat cu succes!", {
        toastId: "create-account-succes",
      });

      // Resetează starea formData pentru a șterge valorile introduse în formular
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      // Redirecționează utilizatorul către pagina de autentificare
      handleShowLoginForm();
    } catch (error) {
      console.error("Eroare la crearea contului:", error.response.data.error);
      // Aici poți trata eroarea și afișa un mesaj corespunzător
      toast.error("Eroare la crearea contului.", {
        toastId: "create-account-error",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container
      style={{
        backgroundImage: `url(${budget})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className="container d-flex justify-content-start align-items-center"
    >
      <Row className="row d-flex justify-content-center align-items-center">
        <Col className="formular d-flex flex-column justify-content-between align-items-center">
          <div className="formular-butoane d-flex flex-row justify-content-between align-items-center">
            <Button className="buton" onClick={handleShowLoginForm}>
              Autentificare
            </Button>
            <Button className="buton" onClick={handleShowCreateForm}>
              Creează Cont
            </Button>
          </div>

          {showLoginForm && (
            <Form className="formular2" onSubmit={handleLogin}>
              <Form.Group
                className="camp d-flex flex-row justify-content-start align-items-center m-2"
                controlId="formEmailLogin"
              >
                <Image className="camp1 p-2" src={user} />
                <Form.Control
                  className="camp2"
                  type="email"
                  placeholder="Introdu adresa de email"
                  required
                  name="email" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.email} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group
                className="camp d-flex flex-row justify-content-start align-items-center mt-2"
                controlId="formPasswordLogin"
              >
                <Image className="camp1 p-2" src={key} />
                <Form.Control
                  className="camp2"
                  type="password"
                  placeholder="Introdu parola"
                  required
                  name="password" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.password} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button className="buton2" type="submit">
                Autentificare
              </Button>
            </Form>
          )}

          {showCreateForm && (
            <Form className="formular2" onSubmit={handleCreateAccount}>
              <Form.Group
                className="w-100 d-flex flex-row justify-content-between align-items-center m-2"
                controlId="formFirstName"
              >
                <Form.Control
                  className="d-flex flex-row justify-content-between align-items-center"
                  type="text"
                  placeholder="Introdu numele"
                  required
                  name="firstName" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.firstName} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group
                className="w-100 d-flex flex-row justify-content-between align-items-center m-2"
                controlId="formLastName"
              >
                <Form.Control
                  className="d-flex flex-row justify-content-between align-items-center"
                  type="text"
                  placeholder="Introdu prenumele"
                  required
                  name="lastName" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.lastName} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group
                className="w-100 d-flex flex-row justify-content-between align-items-center m-2"
                controlId="formEmailCreate"
              >
                <Form.Control
                  className="d-flex flex-row justify-content-between align-items-center"
                  type="email"
                  placeholder="Introdu adresa de email"
                  required
                  name="email" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.email} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group
                className="w-100 d-flex flex-row justify-content-between align-items-center m-2"
                controlId="formPasswordCreate"
              >
                <Form.Control
                  className="d-flex flex-row justify-content-between align-items-center"
                  type="password"
                  placeholder="Introdu parola"
                  required
                  name="password" // Adaugă name pentru a asocia cu cheia din formData
                  value={formData.password} // Adaugă value pentru a sincroniza cu starea formData
                  onChange={handleInputChange}
                />
              </Form.Group>

              <div className="w-100 h-20 gap-3 d-flex flex-row justify-content-center align-items-center m-2">
                <Button className="buton4" onClick={handleShowLoginForm}>
                  Anulează
                </Button>
                <Button className="buton3" type="submit">
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
