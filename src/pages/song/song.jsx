import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Create, Edit } from ".";

export function Song() {
  const [songs, setSongs] = useState([]);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/songs');
      setSongs(response.data.data);
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data lagu:', error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [])

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            {
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              type: 'success'
            }).then(() => {
              window.location.reload()
            })
          const Deleted = async () => {
            await axios.delete('http://localhost:8000/api/songs/' + id);
          }
          Deleted()
        }
      })
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data lagu:', error);
    }

  }

  return (
    <div className="col-12 col-md-9 col-lg-8 col-xl-7">
      <div className="card">
        <div className="card-header pb-0">
          <h1 className="fw-bold fs-4 text-center">
            SONGS
          </h1>
        </div>
        <div className="card-body">
          <h5 className="card-title pb-4">
            
          </h5>

          <button className="btn btn-primary px-4 mb-2" onClick={() => { setCreate(true) }}>Tambah</button>
          {create ? <Create onClose={() => { setCreate(false) }} show={create} /> : null}
          {edit ? <Edit onClose={() => { setEdit(false) }} show={edit} id={id} /> : null}

          <table className="table">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">  Cover</th>
                <th scope="col">Penyanyi</th>
                <th scope="col">Judul lagu</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {songs.length > 0 ? (
                songs.map((song, index) => (
                  <tr key={song.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={`http://localhost:8000/songs-images/${song.image}`}
                        style={{ width: "100px", height: "50px" }}
                        className='rounded' />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{song.nama}</td>
                    <td style={{ verticalAlign: "middle" }}>{song.judul_lagu}</td>
                    <td style={{ verticalAlign: "middle" }}>
                      <span className="btn text-warning underline" onClick={
                        () => {
                          setEdit(true);
                          setId(song.id);
                        }
                      }>
                        <u>Edit</u>
                      </span>
                      <span className="btn ps-1 text-danger" onClick={() => { handleDelete(song.id) }}>
                        <u>Delete</u>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Tidak ada lagu yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}