import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // new movie state
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  //update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  //upload file state
  const [fileToUpload, setFileToUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
      //console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deletemovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileToUpload)return;
    try {
      const filesFolderRef = ref(storage, `project files/${fileToUpload.name}`);
      await uploadBytes(filesFolderRef, fileToUpload);     
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          type="text"
          placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release date"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> received an oscar</label>
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deletemovie(movie.id)}>Delete Movie</button>

            <input
              type="text"
              placeholder="Movie title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => setFileToUpload(e.target.files[0])}
        />

        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
