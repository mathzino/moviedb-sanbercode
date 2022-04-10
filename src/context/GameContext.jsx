import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
export const GameContext = createContext();
export const GameProvider = (props) => {
  let [dataGame, setDataGame] = useState([]);
  let [fetchStatus, setFetchStatus] = useState(true);
  let [currentId, setCurrentId] = useState(-1);
  let [inputGame, setInputGame] = useState({
    name: "",
    genre: "",
    singlePlayer: false,
    multiplayer: false,
    platform: "",
    release: "",
    image_url: "",
  });
  const getDataGame = async () => {
    const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`);
    let data = result.data;
    console.log(data);
    setDataGame(
      data.map((d, index) => {
        let { id, name, genre, singlePlayer, multiplayer, platform, release, image_url } = d;
        let no = index + 1;
        return {
          id,
          name,
          genre,
          singlePlayer,
          multiplayer,
          platform,
          release,
          image_url,
        };
      })
    );
  };
  let { id, name, genre, singlePlayer, multiplayer, platform, release, image_url } = inputGame;
  const handleChangeGame = (e) => {
    let value = e.target.value;
    let nameOfInput = e.target.name;
    setInputGame({ ...inputGame, [nameOfInput]: value });
    console.log(inputGame);
  };
  let history = useHistory();
  let handleSubmitGame = (e) => {
    e.preventDefault();
    if (currentId === -1) {
      axios
        .post(
          `https://backendexample.sanbersy.com/api/data-game`,
          {
            id,
            name,
            genre,
            singlePlayer,
            multiplayer,
            platform,
            release,
            image_url,
          },
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        )
        .then((res) => {
          let data = res.data;
          // console.log(data);
          history.push("/dashboard/game/table");
          // message.success("Berhasil menambahkan data");
          setFetchStatus(true);
        });
    } else {
      axios
        .put(
          `https://backendexample.sanbersy.com/api/data-game/${currentId}`,
          {
            id,
            name,
            genre,
            singlePlayer,
            multiplayer,
            platform,
            release,
            image_url,
          },
          { headers: { Authorization: "Bearer" + Cookies.get("token") } }
        )
        .then(() => {
          let game = dataGame.find((el) => el.id === currentId);
          game = inputGame;
          history.push("/dashboard/game/table");
          // message.success("Berhasil menambahkan data");
          setFetchStatus(true);
        });
    }
  };
  const handleDeleteGame = (e) => {
    let dataId = e.target.value;
    console.log(dataId);
    axios.delete(`https://backendexample.sanbersy.com/api/data-game/${dataId}`, { headers: { Authorization: "Bearer" + Cookies.get("token") } }).then((res) => {
      setFetchStatus(true);
    });
  };
  const handleEditGame = (e) => {
    let dataId = e.target.value;
    axios.get(`https://backendexample.sanbersy.com/api/data-game/${dataId}`, { headers: { Authorization: "Bearer" + Cookies.get("token") } }).then((res) => {
      let data = res.data;
      console.log(data);
      setInputGame({
        id: data.id,
        name: data.name,
        genre: data.genre,
        singlePlayer: data.singlePlayer,
        multiplayer: data.multiplayer,
        platform: data.platform,
        release: data.release,
        image_url: data.image_url,
      });
      history.push(`/dashboard/game/form/${dataId}`);
      setCurrentId(data.id);
    });
  };
  let State = { dataGame, setDataGame, fetchStatus, setFetchStatus, currentId, setCurrentId, inputGame, setInputGame };
  let Function = { getDataGame, handleChangeGame, handleSubmitGame, handleDeleteGame, handleEditGame };
  return <GameContext.Provider value={{ State, Function }}>{props.children}</GameContext.Provider>;
};
