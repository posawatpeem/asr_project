import { useEffect, useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player(trackUris) {
    let access_token = localStorage.getItem("access_token");
    const [play, setPlay] = useState(false);
    console.log(trackUris);
  
    useEffect(() => setPlay());
  
    if (!access_token) return null
    if (trackUris.length === 0) trackUris = [];
    return (
      <SpotifyPlayer
        token={access_token}
        showSaveIcon
        callback={state => {
          if (!state.isPlaying) setPlay(false)
        }}
        uris={[]}
      />
    )
  }