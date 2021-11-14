import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ musicRef,Musics,setMusics,setCurrentMusic,isPlaying,Visible }) => {
  return (
    <div className={` library ${Visible ? 'active-library' : ""}`}>
      <h2>Library</h2>
      <div className="library-songs ">
        {Musics.map((song) => (
          <LibrarySong
            musicRef={musicRef}
            song={song}
            setCurrentMusic={setCurrentMusic}
            songs={Musics}
            id={song.id}
            key={song.id}
            isPlaying={isPlaying}
            setMusics={setMusics}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
