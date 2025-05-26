import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Image,
  InputGroup,
  Table,
} from "react-bootstrap";
import { GuestbookContext } from "../api/GuestBookContext";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { FaFileDownload, FaTimes } from "react-icons/fa";
import { BiSolidDoorOpen } from "react-icons/bi";
import klatenLogo from "../assets/logo-klaten.png";
import deptLogo from "../assets/logo-diskominfo-klaten.png";

const AdminData = () => {
  const { entries, setEntries } = useContext(GuestbookContext);
  const [filteredData, setFilteredData] = useState(entries);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [date, setDate] = useState(null);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.success("Berhasil logout.");
    navigate("/login");
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("guestbook-table");
    const options = {
      filename: "guestbook.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(options).save();
  };

  useEffect(() => {
    const filtered = entries.filter((entry) => {
      const formatedDate = dayjs(date);
      const matchDate = date
        ? dayjs(entry.tanggal).isSame(dayjs(formatedDate), "day")
        : true;

      const matchSearch = search
        ? Object.values(entry)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;

      return matchDate && matchSearch;
    });

    setFilteredData(filtered);
  }, [entries, date, search]);

  const populateEntries = () => {
    if (entries.length === 0) {
      const sampleEntries = [
        {
          nama: "Reynold Kunarto",
          keperluan: "Magang",
          alamat: "-",
          noTelp: "0851231231223",
          institusi: "UAJY",
          tanggal: dayjs(),
        },
        {
          nama: "Suwarmi",
          keperluan: "Berkeluh kesah",
          noTelp: "0851231231344",
          alamat: "-",
          institusi: "-",
          tanggal: dayjs().subtract(1, "day"),
        },
        {
          nama: "Hartoni",
          keperluan: "Mengunjungi istri",
          noTelp: "0851231231569",
          alamat: "Jalan Mawar 22",
          institusi: "-",
          tanggal: dayjs().add(2, "day"),
        },
      ];
      setEntries(sampleEntries);
      setFilteredData(sampleEntries);
    }
  };

  const clearEntries = () => {
    setEntries([]);
    localStorage.removeItem("guestbookEntries");
  };

  return (
    <Container className="align-items-center" style={{ minHeight: "100vh" }}>
      {isLoggedIn ? (
        <div>
          <div
            className="mt-2 position-relative w-100"
            style={{ height: "80px" }}
          >
            <div
              className="d-flex align-items-center"
              style={{ position: "absolute", left: 0 }}
            >
              <Image
                src={klatenLogo}
                alt="City Logo"
                style={{ maxHeight: "50px" }}
                fluid
              />
              <div className="mx-2">
                <p className="my-0 fw-bold" style={{ fontSize: "12px" }}>
                  PEMERINTAH
                </p>
                <p className="my-0 fw-bold" style={{ fontSize: "12px" }}>
                  KABUPATEN KLATEN
                </p>
              </div>
            </div>

            <div className="position-absolute top-50 start-50 translate-middle">
              <Image
                src={deptLogo}
                alt="Department Logo"
                style={{ maxHeight: "75px" }}
                fluid
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center p-3">
            <div style={{ width: "33%" }}></div>

            <h1
              className="fw-bold text-center m-0"
              style={{ color: "#2b5ba2", width: "33%" }}
            >
              BUKU TAMU
            </h1>
            <div
              style={{
                width: "33%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="danger" onClick={handleLogout}>
                <span>
                  <BiSolidDoorOpen size={25} />
                </span>
                Logout
              </Button>
            </div>
          </div>

          {entries.length === 0 ? (
            <div className="mt-3">
              <h4 className="text-center text-danger fw-bold">
                Tidak ada data tamu.
              </h4>
              <Button variant="success" onClick={populateEntries}>
                Tambah Data
              </Button>
            </div>
          ) : (
            <div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <Button
                  onClick={handleDownloadPDF}
                  style={{ background: "#2b5ba2" }}
                >
                  <span>
                    <FaFileDownload size={25} className="me-2" />
                  </span>
                  Download PDF
                </Button>

                <InputGroup
                  style={{ position: "", flex: 1 }}
                  className="d-flex justify-content-end"
                >
                  <DatePicker
                    name="date"
                    selected={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    placeholderText="Pilih tanggal"
                    className="form-control"
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  <InputGroup.Text>
                    <FaTimes
                      onClick={() => setDate(null)}
                      style={{ cursor: "pointer" }}
                    />
                  </InputGroup.Text>
                </InputGroup>

                <InputGroup style={{ position: "relative", flex: 1 }}>
                  <Form.Control
                    name="search"
                    placeholder="Cari..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <InputGroup.Text>
                    <FaTimes
                      onClick={() => setSearch("")}
                      style={{ cursor: "pointer" }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </div>

              <div style={{ maxHeight: "450px", overflowY: "auto" }}>
                <Table id="guestbook-table" striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>No Telepon</th>
                      <th>Keperluan</th>
                      <th>Alamat</th>
                      <th>Institusi</th>
                      <th>Tanggal/Jam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((entry, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.nama}</td>
                        <td>{entry.noTelp}</td>
                        <td>{entry.keperluan}</td>
                        <td>{entry.alamat ? entry.alamat : "-"}</td>
                        <td>{entry.institusi ? entry.institusi : "-"}</td>
                        <td>
                          {dayjs(entry.tanggal).format("DD-MM-YYYY/HH:mm")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Button className="my-2" variant="danger" onClick={clearEntries}>
                Hapus Semua
              </Button>
            </div>
          )}
          <p>*Data disimpan lokal.</p>
        </div>
      ) : (
        <div>Hey penyusup!!!</div>
      )}
    </Container>
  );
};

const styles = {
  clearIcon: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "gray",
    zIndex: 2,
  },
};

export default AdminData;
