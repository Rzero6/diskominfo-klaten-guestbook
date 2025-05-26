import React, { useState, useContext } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import dayjs from "dayjs";
import {
  FaUser,
  FaHome,
  FaBuilding,
  FaPaperPlane,
  FaPenAlt,
  FaPhone,
} from "react-icons/fa";
import klatenLogo from "../assets/logo-klaten.png";
import deptLogo from "../assets/logo-diskominfo-klaten.png";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { GuestbookContext } from "../api/GuestBookContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GuestbookForm = () => {
  const { setEntries } = useContext(GuestbookContext);
  const [formData, setFormData] = useState({
    tanggal: dayjs(),
    nama: "",
    keperluan: "",
    noTelp: "",
    alamat: "",
    institusi: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validate, setValidate] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    setValidate(true);

    if (form.checkValidity() === false) {
      return;
    }

    const formattedData = {
      ...formData,
      tanggal: dayjs(),
    };
    console.log(formattedData);
    setEntries((prevEntries) => [...prevEntries, formattedData]);
    setSubmitted(true);
    toast("Menuju halaman admin...");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const navigate = useNavigate();
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        className="shadow-lg rounded-4 p-4 justify-content-center"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="text-center mb-3">
          <div className="text-center mb-3 d-flex flex-column align-items-center">
            <Image
              src={klatenLogo}
              alt="City Logo"
              style={{ maxWidth: "60px", height: "auto" }}
              className="mb-2"
              fluid
            />
            <Image
              src={deptLogo}
              alt="Department Logo"
              style={{ maxWidth: "75%" }}
              className="mb-2"
              fluid
            />
          </div>
        </div>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold">
            ✅ Terimakasih, sampai jumpa lagi.
          </div>
        ) : (
          <div>
            <p className="text-muted small">
              Selamat Datang, mohon isi data anda.
            </p>
            <Form
              noValidate
              validated={validate}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <Form.Group>
                <InputGroup hasValidation className="mb-3">
                  <InputGroupText>
                    <FaUser />
                  </InputGroupText>
                  <Form.Control
                    type="text"
                    name="nama"
                    placeholder="Nama Lengkap"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Mohon di isi.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup hasValidation className="mb-3">
                  <InputGroupText>
                    <FaPhone />
                  </InputGroupText>
                  <Form.Control
                    type="tel"
                    name="noTelp"
                    placeholder="Nomor Telepon"
                    value={formData.noTelp}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Mohon di isi.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup hasValidation className="mb-3">
                  <InputGroupText>
                    <FaPenAlt />
                  </InputGroupText>
                  <Form.Control
                    as="textarea"
                    name="keperluan"
                    placeholder="Keperluan"
                    value={formData.keperluan}
                    rows={2}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Mohon di isi.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup className="mb-3">
                  <InputGroupText>
                    <FaHome />
                  </InputGroupText>
                  <Form.Control
                    type="text"
                    name="alamat"
                    placeholder="Alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                  ></Form.Control>
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <InputGroup className="mb-3">
                  <InputGroupText>
                    <FaBuilding />
                  </InputGroupText>
                  <Form.Control
                    type="text"
                    name="institusi"
                    placeholder="Institusi"
                    value={formData.institusi}
                    onChange={handleChange}
                  ></Form.Control>
                </InputGroup>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  className="d-flex align-items-center justify-content-center gap-2 fw-bold"
                  style={{ background: "#2b5ba2" }}
                >
                  Kirim
                  <FaPaperPlane size={14} />
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default GuestbookForm;
