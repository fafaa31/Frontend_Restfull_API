import axios from "axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    await axios.post('http://localhost:8000/api/auth/login', data)
      .then((response) => {
        Swal.fire({
          'icon': 'success',
          'title': 'Success Login!!',
          'text': 'Pop up will close in 3 seconds',
          'timer': 3000,
        })
        localStorage.setItem('token', response.data.access_token);
        navigate('/home')
      }).catch((error) => {
        setValidation(error.response.data);
      })
  }
  return (
    <div className="w-100 row justify-content-center">
      <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        <h1 className="m-3 text-center">
          Login
        </h1>
        <div className="card">
          <div className="card-body p-5">
            <h2 className="text-uppercase text-center mb-5">
              Sign in account
            </h2>
            {
              validation.error && (
                <div className="alert alert-danger" role="alert">
                  Mungkin email atau password anda salah
                </div>
              )
            }

            <form onSubmit={handleSubmit}>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  id="email"
                  className="form-control form-control-lg"
                  name="email" />
                <span className="fs-6 text-danger">
                  {validation ? validation.email : ""}
                </span>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">
                  Your Password
                </label>
                <input
                  type="password"
                  placeholder="******"
                  id="password"
                  className="form-control form-control-lg"
                  name="password" />
                <span className="fs-6 text-danger">
                  {validation ? validation.password : ""}
                </span>
              </div>

              <Link to="/" className="btn btn-danger px-4 text-white mx-1">
                Back
              </Link>

              <button type="submit" className="btn btn-primary px-4 text-white">
                Login
              </button>

              <p className="text-center text-muted mt-5 mb-0">
                Anda belum mempunyai akun?
                <a href="/register" className="fw-bold text-body">
                  <u>Registrasi sekarang</u>
                </a>
              </p>

            </form>

          </div>
        </div>
      </div>

    </div>
  )
}