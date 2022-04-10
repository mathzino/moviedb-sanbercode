import React, { useEffect, useContext } from "react";
import { MovieContext } from "./context/MovieContext";
const MovieForm = (props) => {
  const { StateMovie, FunctionMovie } = useContext(MovieContext);
  const { dataMovie, setDataMovie, fetchStatus, setFetchStatus, inputMovie, setInputMovie, currentId, setCurrentId } = StateMovie;
  const { getDataMovie, handleChangeMovie, handleSubmitMovie } = FunctionMovie;
  useEffect(() => {}, []);
  return (
    <>
      <div className="list-form">
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Movie Form</h1>
        <form onSubmit={handleSubmitMovie} className="form_buah">
          <label>Title</label>
          <input required onChange={handleChangeMovie} type="text" name="title" value={inputMovie.title} />
          <br />
          <label>Description</label>
          <br />
          <textarea required style={{ width: "100%" }} onChange={handleChangeMovie} name="description" type="text" value={inputMovie.description}></textarea>
          <br />
          <label>Duration</label>
          <input required onChange={handleChangeMovie} type="text" name="duration" value={inputMovie.duration} />
          <br />
          <label>Rating</label>
          <input required min={0} max={10} onChange={handleChangeMovie} type="text" name="rating" value={inputMovie.rating} /> <br />
          <label>Genre</label>
          <input required onChange={handleChangeMovie} type="text" name="genre" value={inputMovie.genre} /> <br />
          <label>Review</label>
          <input required onChange={handleChangeMovie} type="text" name="review" value={inputMovie.review} /> <br />
          <label>Image URL</label>
          <input required onChange={handleChangeMovie} type="text" name="image_url" value={inputMovie.image_url} /> <br />
          <label>Year</label>
          <input required min={1980} max={2021} onChange={handleChangeMovie} type="text" name="year" value={inputMovie.year} /> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default MovieForm;
