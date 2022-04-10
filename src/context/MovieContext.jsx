import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
export const MovieContext = createContext();
export const MovieProvider = (props) => {
  let [dataMovie, setDataMovie] = useState([]);
  let [fetchStatus, setFetchStatus] = useState(true);
  let [currentId, setCurrentId] = useState(-1);
  let [inputMovie, setInputMovie] = useState({
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    rating: "",
    review: "",
    image_url: "",
  });
  const getDataMovie = async () => {
    const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`);
    let data = result.data;
    console.log(data);
    setDataMovie(
      data.map((d, index) => {
        let { id, image_url, title, year, duration, genre, rating, description } = d;
        let no = index + 1;
        return {
          id,
          image_url,
          title,
          year,
          duration,
          genre,
          rating,
          description,
        };
      })
    );
  };
  let { title, description, year, duration, genre, rating, review, image_url, id } = inputMovie;
  const handleChangeMovie = (e) => {
    let value = e.target.value;
    let nameOfInput = e.target.name;
    setInputMovie({ ...inputMovie, [nameOfInput]: value });
    console.log(inputMovie);
  };
  let history = useHistory();
  let handleSubmitMovie = (e) => {
    e.preventDefault();
    if (currentId === -1) {
      axios
        .post(
          `https://backendexample.sanbersy.com/api/data-movie`,
          {
            id,
            image_url,
            title,
            year,
            duration,
            genre,
            rating,
            review,
            description,
          },
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        )
        .then((res) => {
          let data = res.data;
          // console.log(data);
          history.push("/dashboard/movie/table");
          // message.success("Berhasil menambahkan data");
          setFetchStatus(true);
        });
    } else {
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-movie/${currentId}`,
          {
            id,
            image_url,
            title,
            year,
            duration,
            genre,
            rating,
            review,
            description,
          },
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        )
        .then(() => {
          let movie = dataMovie.find((el) => el.id === currentId);
          movie = inputMovie;
          history.push("/dashboard/movie/table");
          // message.success("Berhasil menambahkan data");
          setFetchStatus(true);
        });
    }
  };
  const handleDeleteMovie = (e) => {
    let dataId = e.target.value;
    console.log(dataId);
    axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${dataId}`, { headers: { Authorization: "Bearer" + Cookies.get("token") } }).then((res) => {
      setFetchStatus(true);
    });
  };
  const handleEditMovie = (e) => {
    let dataId = e.target.value;
    axios.get(`https://backendexample.sanbersy.com/api/data-movie/${dataId}`, { headers: { Authorization: "Bearer" + Cookies.get("token") } }).then((res) => {
      let data = res.data;
      console.log(data);
      setInputMovie({
        id: data.id,
        image_url: data.image_url,
        title: data.title,
        year: data.year,
        duration: data.duration,
        genre: data.genre,
        rating: data.rating,
        review: data.review,
        description: data.description,
      });
      history.push(`/dashboard/movie/form/${dataId}`);
      setCurrentId(data.id);
    });
  };
  let StateMovie = { dataMovie, setDataMovie, fetchStatus, setFetchStatus, currentId, setCurrentId, inputMovie, setInputMovie };
  let FunctionMovie = { getDataMovie, handleChangeMovie, handleSubmitMovie, handleDeleteMovie, handleEditMovie };
  return <MovieContext.Provider value={{ StateMovie, FunctionMovie }}>{props.children}</MovieContext.Provider>;
};
