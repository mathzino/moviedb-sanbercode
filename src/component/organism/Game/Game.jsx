import React, { useEffect, useState, useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import { Card, Space } from "antd";

const { Meta } = Card;

const Game = (props) => {
  let [state, setState] = useState({ loading: true });
  const { loading } = state;
  let onChange = (checked) => {
    setState({ loading: !checked });
  };

  let { State, Function } = useContext(GameContext);
  let { dataGame, fetchStatus, setFetchStatus } = State;
  let { getDataGame } = Function;
  useEffect(() => {
    if (fetchStatus) {
      getDataGame();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <>
      <div className="body-card">
        <h1 style={{ margin: "10px auto", textAlign: "center", fontSize: "30px" }}>Game</h1>
        <Space
          size={[70, 40]}
          wrap
          style={{
            margin: "50px auto",
            border: "1px solid white",
            justifyContent: "center",
          }}
        >
          {dataGame !== null && (
            <>
              {dataGame.map((res, index) => {
                return (
                  <>
                    <div loading={loading} avatar active className="card">
                      <Card hoverable style={{ width: 240 }} cover={<img alt="example" style={{ objectFit: "cover", height: "300px", width: "240px" }} src={res.image_url} />}>
                        <Meta title={res.name} description={res.genre} />
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
};

export default Game;
