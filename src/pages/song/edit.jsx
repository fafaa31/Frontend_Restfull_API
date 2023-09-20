import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export function Edit({ onClose, show, id }) {

  const [validation, setValidation] = useState([]);
  const [song, setSong] = useState({});
  const [file, setFile] = useState("");

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/songs/' + id);
      setSong(response.data.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data lagu:', error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [])

  useEffect(() => {
    setFile('http://localhost:8000/songs-images/' + song?.image || '');
  }, [song])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    await axios.put(`http://localhost:8000/api/songs/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then(() => {
        Swal.fire({
          'icon': 'success',
          'title': 'Success Mengubah data!!',
          'text': 'Pop up will close in 3 seconds',
          'timer': 3000,
        })
        location.reload();
      }).catch((error) => {
        setValidation(error.response.data);
      })
  }
  const handleInput = (e) => {
    setSong({ ...song, [e.target.name]: e.target.value });
  };

  const handlePreview = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <h1 className='fs-3 mb-0'>
            Edit Lagu
          </h1>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit} >

            <div className="mb-3">
              <label htmlFor="judul" className="form-label">
                Judul Lagu
              </label>
              <input
                type="text"
                className="form-control"
                id="judul"
                value={song?.judul_lagu || ''}
                onChange={handleInput}
                name='judul_lagu' />
              <span className="fs-6 text-danger">
                {validation ? validation.judul_lagu : ""}
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="penyanyi" className="form-label">
                Penyanyi
              </label>
              <input
                type="text"
                className="form-control"
                value={song?.nama || ''}
                onChange={handleInput}
                id="penyanyi"
                name='nama' />
              <span className="fs-6 text-danger">
                {validation ? validation.nama : ""}
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="cover" className="form-label">Cover lagu</label>
              <input type="file"
                className="form-control"
                id="cover"
                onChange={handlePreview}
                name='image' />
              <span className="fs-6 text-danger">
                {validation ? validation.image : ""}
              </span>
              <img
                className="mt-2 rounded"
                src={file}
                alt={song.judul_lagu}
                style={{ width: "450px", height: "300px" }}
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-danger" onClick={onClose}>Kembali</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}