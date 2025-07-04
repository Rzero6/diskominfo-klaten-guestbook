import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import klatenLogo from "../assets/logo-klaten.png";
import deptLogo from "../assets/logo-diskominfo-klaten.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GuestbookContext } from "../api/GuestBookContext";

const AdminLogin = () => {
  const { login, isLoggedIn } = useContext(GuestbookContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleValidate = (e) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "12345") {
      login();
      toast.success("Login Sukses!");
      navigate("/guestbook");
    } else {
      toast.error("Salah username/password. hint: admin/12345");
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/guestbook");
    }
  }, [isLoggedIn, navigate]);
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow-lg rounded-4 p-4"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="text-center mb-3">
          <Image
            src={klatenLogo}
            alt="City Logo"
            style={{ maxWidth: "60px" }}
            className="mb-2 d-block mx-auto"
            fluid
          />
          <Image
            src={deptLogo}
            alt="Department Logo"
            style={{ maxWidth: "75%" }}
            className="mb-2 d-block mx-auto"
            fluid
          />
          <h1 className="fw-bold" style={{ color: "#2b5ba2" }}>
            BUKU TAMU
          </h1>
        </div>

        <Form onSubmit={handleValidate}>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaUser />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaLock />
            </InputGroup.Text>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <div className="d-grid">
            <Button
              type="submit"
              style={{ background: "#2b5ba2" }}
              className="fw-bold"
            >
              Login
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminLogin;
