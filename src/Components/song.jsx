import React from "react";

const Song = ({ currentMusic }) => {
  return (
    <div className="song-container ">
      <img
        alt={currentMusic.name}
        src={currentMusic.cover}
      ></img>
      <h2> {currentMusic.name}</h2>
      <h3> {currentMusic.artist}</h3>
    </div>
  );
};

export default Song;
