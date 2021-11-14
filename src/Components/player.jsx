import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  musics,
  setMusics,
  setCurrentMusic,
  songInfo,
  setsongInfo,
  musicRef,
  currentMusic,
  isPlaying,
  setIsPlaying,
}) => {
  useEffect(() => {
    const newSongs = musics.map((song) => {
      if (song.id === currentMusic.id) {
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
  }, [currentMusic]);

  const length = musics.length;

  /* Handler for playing Music when clicked */
  const playMusicHandler = () => {
    // console.log(musicRef.current);
    if (isPlaying) {
      musicRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      musicRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  /* Handler for setting Time */
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    musicRef.current.currentTime = e.target.value;
    setsongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  //handler for skipping Music
  const skipSongHandler = (direction) => {
    let currIndex = musics.findIndex((song) => song.id === currentMusic.id);
    if (direction === "forward") {
      console.log(currIndex + (1 % length));
      setCurrentMusic(musics[(currIndex + 1) % length]);
    }
    if (direction === "back") {
      if ((currIndex - 1) % length === -1) {
        setCurrentMusic(musics[length - 1]);
        return;
      }
      setCurrentMusic(musics[(currIndex - 1) % length]);
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipSongHandler("back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playMusicHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipSongHandler("forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <h4 className="footer"> Made with❤️ by Saravana</h4>
    </div>
  );
};
export default Player;
