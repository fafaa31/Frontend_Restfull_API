import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Song, Profile } from ".";

export function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [])

  return (
    <div className="w-100 row">
      <Profile token={token} />
      <Song />
    </div>
  )
}