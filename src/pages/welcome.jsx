import { Link, useNavigate } from "react-router-dom"
import { Layouts } from "../layouts"
import { useEffect } from "react";

export function Welcome() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);
  return (
    <Layouts>
      <div class="jumbotron">
        <h1 class="display-4">Welcome guyss</h1>
        <p class="lead">
          ini merupakan tugas ke 2 membuat auth API dan songs API dengan menggunakan Laravel & React 
        </p>
        <hr class="my-4" />
        <p>
          Silahkan Registrasi terlebih dahulu jika anda belum mempunyai akun, setelah itu silahkan Login Kembali
        </p>

        <Link to="register" class="btn btn-secondary px-4 px-1 me-2">Register</Link>
        <Link to="login" class="btn btn-primary btn-lg px-4 py-1">Login</Link>
      </div>
    </Layouts >
  )
} 