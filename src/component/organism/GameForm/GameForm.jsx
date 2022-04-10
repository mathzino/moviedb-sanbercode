import React, { useEffect, useContext } from "react";
import { GameContext } from "../../../context/GameContext";

const GameForm = (props) => {
  const { State, Function } = useContext(GameContext);
  const { inputGame, setInputGame } = State;
  const { handleChangeGame, handleSubmitGame } = Function;
  useEffect(() => {}, []);

  const handleCheckbox = (event) => {
    let value = event.target.checked;
    let name = event.target.name;

    setInputGame({ ...inputGame, [name]: value });
    console.log(inputGame);
  };
  return (
    <>
      <div className="list-form">
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Game Form</h1>
        <form onSubmit={handleSubmitGame} className="form_buah">
          <label>Name</label>
          <input required onChange={handleChangeGame} type="text" name="name" value={inputGame.name} />
          <br />
          <input required onChange={handleChangeGame} type="text" name="release" value={inputGame.release} />
          <br />
          <label>Platform</label>
          <input required min={0} max={10} onChange={handleChangeGame} type="text" name="platform" value={inputGame.platform} /> <br />
          <label>Genre</label>
          <input required onChange={handleChangeGame} type="text" name="genre" value={inputGame.genre} /> <br />
          <label>Image URL</label>
          <input required onChange={handleChangeGame} type="text" name="image_url" value={inputGame.image_url} /> <br />
          <input type="checkbox" id="singlePlayer" name="singlePlayer" checked={inputGame.singlePlayer} onChange={handleCheckbox} />
          <label for="singlePlayer"> Single Player</label>
          <br />
          <input type="checkbox" id="multiplayer" name="multiplayer" checked={inputGame.multiplayer} onChange={handleCheckbox} />
          <label for="multiplayer"> Multiplayer</label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default GameForm;
