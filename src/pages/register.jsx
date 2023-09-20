import axios from "axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [validation, setValidation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    await axios.post('http://localhost:8000/api/auth/register', data)
      .then(() => {
        Swal.fire({
          'icon': 'success',
          'title': 'Success Register!!',
          'text': 'Pop up will close in 2 seconds',
          'timer': 3000,
        })
        navigate('/login')
      }).catch((error) => {
        setValidation(error.response.data);
      })
  }
  return (
    <div className="w-100 row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <h1 className="m-3 text-center">
          Registrasi
        </h1>
        <div className="card">
          <div className="card-body p-5">
            <h2 className="text-uppercase text-center mb-5">
              Create an account
            </h2>

            <form onSubmit={handleSubmit} method="POST">

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name" />
                <span className="fs-6 text-danger">
                  {validation ? validation.name : ""}
                </span>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@gmail.com"
                  className="form-control form-control-lg"
                  name="email" />
                <span className="fs-6 text-danger">
                  {validation ? validation.email : ""}
                </span>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="******"
                  className="form-control form-control-lg"
                  name="password" />
                <span className="fs-6 text-danger">
                  {validation ? validation.password : ""}
                </span>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="passwordConfirm">
                  Repeat your password
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  placeholder="******"
                  className="form-control form-control-lg"
                  name="password_confirmation" />
                <span className="fs-6 text-danger">
                  {validation ? validation.password_confirmation : ""}
                </span>

              </div>


              <Link to="/" className="btn btn-danger px-4 text-white mx-1">
                back
              </Link>

              <button type="submit" className="btn btn-primary px-4 text-white">
                Register
              </button>

              <p className="text-center text-muted mt-5 mb-0">
                Apakah anda sudah memiliki akun?
                <a href="/login" className="text-body fw-bold">
                  <u>Login sekarang</u>
                </a>
              </p>

            </form>

          </div>
        </div>
      </div>

    </div>
  )
}