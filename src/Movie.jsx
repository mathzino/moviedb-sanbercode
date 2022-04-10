import React, { useEffect, useState, useContext } from "react";

import { Card, Space } from "antd";

import { MovieContext } from "./context/MovieContext";
const { Meta } = Card;
const Movie = (props) => {
  let { StateMovie, FunctionMovie } = useContext(MovieContext);
  let { dataMovie, setDataMovie, fetchStatus, setFetchStatus, currentId, setCurrentId, inputMovie, setInputMovie } = StateMovie;
  let { getDataMovie, handleChangeMovie, handleSubmitMovie, handleDeleteMovie, handleEditMovie } = FunctionMovie;
  useEffect(() => {
    if (fetchStatus) {
      getDataMovie();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);
  return (
    <>
      <h1 style={{ margin: "40px auto", textAlign: "center", fontSize: "30px" }}>Movie</h1>
      <Space
        size={[300, 60]}
        wrap
        style={{
          margin: "50px auto 80px",

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
    </>
  );
};

export default Movie;
