import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Card } from "antd";
import { Space, Button } from "antd";
import { GameContext } from "./context/GameContext";
import { MovieContext } from "./context/MovieContext";
const { Meta } = Card;
const Home = () => {
  let { State, Function } = useContext(GameContext);
  let { dataGame, fetchStatus, setFetchStatus } = State;
  let { getDataGame, handleChangeGame, handleSubmitGame, handleDeleteGame, handleEditGame } = Function;
  let { StateMovie, FunctionMovie } = useContext(MovieContext);
  let { dataMovie, setDataMovie, inputMovie, setInputMovie } = StateMovie;
  let { getDataMovie, handleChangeMovie, handleSubmitMovie, handleDeleteMovie, handleEditMovie } = FunctionMovie;
  useEffect(() => {
    if (fetchStatus) {
      getDataGame();
      getDataMovie();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);
  const Demo = () => (
    <>
      <div className="container" style={{ borderRadius: "30px", padding: "20px" }}>
        <h1 style={{ margin: "10px auto", textAlign: "center", fontSize: "30px", color: "white" }}>Game</h1>
        <Space
          size={[70, 40]}
          wrap
          style={{
            margin: "50px auto",

            justifyContent: "center",
          }}
        >
          {dataGame !== null && (
            <>
              {dataGame.map((res, index) => {
                if (index < 5) {
                  return (
                    <>
                      <div className="card">
                        <Card hoverable style={{ width: 240 }} cover={<img alt="example" style={{ objectFit: "cover", height: "300px", width: "240px" }} src={res.image_url} />}>
                          <Meta title={res.name} description={res.genre} />
                        </Card>
                      </div>
                    </>
                  );
                }
              })}
            </>
          )}
        </Space>
        <h1 style={{ margin: "120px auto 40px", textAlign: "center", fontSize: "30px", color: "white" }}>Movie</h1>
        <Space
          size={[300, 60]}
          wrap
          style={{
            margin: "50px 0 ",
            justifyContent: "center",
          }}
        >
          {dataMovie !== null && (
            <>
              {dataMovie.map((res, index) => {
                return (
                  <>
                    <div className="card">
                      <Card hoverable style={{ width: 240, height: 400 }} cover={<img alt="example" style={{ objectFit: "cover", height: "300px", width: "240px" }} src={res.image_url} />}>
                        <Meta title={res.title} description={res.genre} />
                      </Card>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </Space>
      </div>
    </>
  );
  let history = useHistory();
  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("email");
    Cookies.remove("token");
    history.push("/");
    window.location.reload();
  };
  const handleLogin = () => {
    history.push("/register");
  };
  return (
    <>
      <div className="home" style={{ border: "2px solid #001529", minHeight: "100px" }}>
        {/* <div className="text">
          <p>Welcome To MDB</p>
          <p style={{ marginBottom: "30px" }}>you can search movies and games </p>
          {Cookies.get("token") === undefined && (
            <button onClick={handleLogin} style={{ color: "white" }} className="login-btn">
              Register
            </button>
          )}
          {Cookies.get("token") !== undefined && (
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          )}
        </div> */}
        <div className="demo login-btn" style={{ width: "80%", margin: "100px auto 67px" }}>
          <Demo />
        </div>
      </div>
    </>
  );
};
export default Home;
