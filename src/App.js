import React, { useState, useRef } from "react";

/*  Adding styles */
import "./styles/app.scss";

/* Adding Components */
import Player from "./Components/player";
import Song from "./Components/song";
import Library from "./Components/Library";
import Nav from "./Components/NewNav";



/* Importing data for Music */
import data from "./data";

function App() {
  /* State */

  /* creating Reference for accessing audio tag */
  const musicRef = useRef(null);

  const [musics, setMusics] = useState(data());
  const [currentMusic, setCurrentMusic] = useState(musics[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  /*  setting song duration and time */
  const [songInfo, setsongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  // stater for toggle library
  const [Visible, setVisible] = useState(false);

  /* Handler for Time upate  */
  const timeUpdateHandler = (e) => {
    const curr = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(curr,duration);

    // for  slider-2nd <div> time update
    const roundedcurrent = Math.round(curr);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedcurrent / roundedDuration) * 100);
    setsongInfo({
      ...songInfo,
      currentTime: curr,
      duration: duration,
      animationPercentage: animation,
    });
  };

  // hanlder for auto skip next
  const length = musics.length;
  const songEndHandler = async () => {
    let currIndex = musics.findIndex((song) => song.id === currentMusic.id);
    setCurrentMusic(musics[(currIndex + 1) % length]);
    if (isPlaying) musicRef.current.play();
  };

  return (
    <div className={`App ${Visible ? "library-active" : ""}`}>
      {/* <div className="loader-screen"> Loader</div> */}
      {/* <LoaderScreen/> */}
  
       <Nav Visible={Visible} setVisible={setVisible} />
      <Song currentMusic={currentMusic} />
      <Player
        musics={musics}
        setMusics={setMusics}
        setCurrentMusic={setCurrentMusic}
        songInfo={songInfo}
        setsongInfo={setsongInfo}
        musicRef={musicRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentMusic={currentMusic}
      />
      <Library
        Visible={Visible}
        musicRef={musicRef}
        Musics={musics}
        isPlaying={isPlaying}
        setCurrentMusic={setCurrentMusic}
        setMusics={setMusics}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler} // automatically time details loaded once song selected
        ref={musicRef}
        src={currentMusic.audio}
        onEnded={songEndHandler}
      ></audio> 
    </div>
  );
}

export default App;
