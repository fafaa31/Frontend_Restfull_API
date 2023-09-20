import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile({ token }) {

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get("http://localhost:8000/api/auth/user-profile");
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Terjadi kesalahan:", error);
      }
    }
  };

  const logoutHandler = async () => {
    Swal.fire({
      title: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios
          .post("http://localhost:8000/api/auth/logout")
          .then(() => {
            localStorage.removeItem("token");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Terjadi kesalahan:", error);
          });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className="col-12 col-md-9 col-lg-6 col-xl-5">
      <div className="card">
        <div className="card-header pb-0">
          <h1 className="fw-bold fs-4 text-center">
            HOME
          </h1>
        </div>
        <div className="card-body">
          <h5 className="card-title pb-4">
          Belajar backend/frontend with laravel + react
          </h5>
          <span className="d-flex gap-2">
            <p className="fw-bold">
              User Login :
            </p>
            <p>{user.name}</p>
          </span>
          <span className="d-flex gap-2">
            <p className="fw-bold">
              User Email :
            </p>
            <p>{user.email}</p>
          </span>

          <p>
          Aplikasi ini dikembangkan dengan 2 bagian yang berbeda, Backend yang yang dibuat Restfull-API dan frontend menggunakana React.js.
          </p>


          <button onClick={logoutHandler} className="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
  )
}