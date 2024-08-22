import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const clientId = "2695e07f91b64a2bbc0e4551654a330a";
  const redirectUri = "http://localhost:5173";
  let accessToken = "";

  useEffect(() => {
    document.getElementById("login").addEventListener("click", () => {
      const scopes =
        "user-read-playback-state user-modify-playback-state streaming";
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes)}`;
      window.location = authUrl;
    });
    // Extract the access token from the URL hash
    window.addEventListener("load", () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      accessToken = params.get("access_token");

      if (accessToken) {
        initializePlayer();
      }
    });
  }, []);
  // Login to Spotify

  useEffect(() => {}, []);

  function initializePlayer() {
    const player = new Spotify.Player({
      name: "Web Playback SDK",
      getOAuthToken: (cb) => {
        cb(accessToken);
      },
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      transferPlayback(device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    // Player state changed
    player.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }
      const currentTrack = state.track_window.current_track;
      document.getElementById("track-name").innerText = currentTrack.name;
      document.getElementById("artist-name").innerText =
        currentTrack.artists[0].name;
      document.getElementById("album-art").src =
        currentTrack.album.images[0].url;
    });

    document.getElementById("play-pause").addEventListener("click", () => {
      player.togglePlay();
    });

    player.connect();
  }

  function transferPlayback(device_id) {
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      body: JSON.stringify({
        device_ids: [device_id],
        play: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <h1>Spotify Player</h1>
      <button id="login">Login to Spotify</button>
      <div className="bg-slate-400">
        <button id="play-pause">Play/Pause</button>
      </div>

      <div id="player-info">
        <h3 id="track-name">Track Name</h3>
        <p id="artist-name">Artist Name</p>
        <img id="album-art" src="" alt="Album Art" width="200px" />
      </div>
    </>
  );
}

export default App;
