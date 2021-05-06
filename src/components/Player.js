import { useEffect, useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player(trackUris) {
    let access_token = localStorage.getItem("access_token");
    const [play, setPlay] = useState(false);
    const [currentQueue, setCurrentQueue] = useState([]);
  
    useEffect(() => {
      setPlay(true);
      setCurrentQueue(trackUris.trackUris);
    }, trackUris.trackUris[0]);

    if (!access_token) return null;
    return (
    <div>
      <SpotifyPlayer
        token={access_token}
        showSaveIcon={true}
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={currentQueue}
      />
    </div>
    )
  }