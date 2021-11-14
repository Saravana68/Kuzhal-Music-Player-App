import React from "react";

const LibrarySong = ({
  setMusics,
  song,
  songs,
  setCurrentMusic,
  id,
  musicRef,
  isPlaying,
}) => {
  const songSelectHandler = () => {
    console.log("song selected");
    // const selected = songs.filter(item => item.id === id);
    // console.log(selected[0]);
    setCurrentMusic(song);
    // musicRef.current.play();

    //add active song
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setMusics(newSongs);

    if (isPlaying) {
      console.log("playing");
      const playPromise = musicRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          musicRef.current.play();
        });
      }
    }
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-Song hvr-grow ${song.active ? "selected" : " "}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3> {song.name}</h3>
        <h4> {song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
