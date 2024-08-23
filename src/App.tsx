import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import PausePlay from "./components/PausePlay";

import "./App.css";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [player, setPlayer] = useState<undefined | Object>();
  const [pauseplay, setPP] = useState("pause");

  const clientId = "2695e07f91b64a2bbc0e4551654a330a";
  const redirectUri = "http://localhost:5173";
  useEffect(() => {
    console.log("useEffect");
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    console.log("TEST");
    console.log("accessToken", accessToken);
    console.log("loaded", params.get("access_token"));
    const access_temp = params.get("access_token");
    if (access_temp) {
      setAccessToken(access_temp);
      document.getElementById("login").style.display = "none";
      document.getElementById("play-pause").style.display = "grid";
      document.getElementById("player-info").style.display = "block";

      initializePlayer(access_temp);
    }
    if (document.getElementById("login")) {
      document.getElementById("login").addEventListener("click", () => {
        const scopes =
          "user-read-playback-state user-modify-playback-state streaming";
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=${encodeURIComponent(scopes)}`;
        window.location = authUrl;
      });
    }

    // Extract the access token from the URL hash
    // window.addEventListener("load", () => {

    // });
  }, []);
  // Login to Spotify

  function initializePlayer(access_token: string) {
    // const player = new Spotify.Player({
    //   name: "Web Playback SDK",
    //   getOAuthToken: (cb) => {
    //     cb(access_token);
    //   },
    // });
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("calling spotify");
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(access_token);
        },
        volume: 0.5,
      });
      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        transferPlayback(device_id, access_token);
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
        document.getElementById("album-art").src = currentTrack.album.images[0]
          .url
          ? currentTrack.album.images[0].url
          : "https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg";
        console.log(
          "art ",
          currentTrack.album.images[0],
          document.getElementById("album-art")
        );
      });

      // document.getElementById("play-pause").addEventListener("click", () => {
      //   console.log("toggle play");
      //   player.togglePlay();
      // });

      player.connect();
      setPlayer(player);
    };
  }

  function transferPlayback(device_id, access_token) {
    fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      body: JSON.stringify({
        device_ids: [device_id],
        play: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  const toggleplay = () => {
    console.log("toggleplay ", player);
    if (player) {
      if (pauseplay === "play") {
        player.pause();
        setPP("pause");
      } else if (pauseplay === "pause") {
        player.resume();
        setPP("play");
      }
    }
  };
  return (
    <>
      <body>
        {/* <div id="player-info">
          <h3 id="track-name">Track Name</h3>
          <p id="artist-name">Artist Name</p>
          <img id="album-art" src="" alt="Album Art" width="200px" />
        </div>
        <h1>Spotify Player</h1> */}
        <button id="login">Login to Spotify</button>
        <div className="max-h-full">
          <div className="bg-base-100">
            <div className="flex flex-row">
              <a className="btn btn-ghost text-xl">Tidal</a>
              <div className="form-control w-[50%] ml-auto mr-60 mb-5">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-24 md:w-auto"
                />
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-none gap-2"></div>
          </div>
          <div className="flex flex-row text-blue-200">
            {/* <div className="flex flex-col w-[20%] mr-10 mt-10 relative min-h-[100%]"> */}
            <ul className="menu  w-48 rounded-l-none rounded-br-none mt-3 border border-zinc-300 border-l-0 rounded-tr-lg">
              <li className="menu-title font-light">Playlists</li>
              <li className="font-light">
                <a>Item 1</a>
              </li>
              <li className="font-light">
                <a>Item 2</a>
              </li>
            </ul>
            {/* </div> */}
            <div className="flex flex-col w-full min-h-screen max-h-screen">
              {/* <div className="flex flex-row min-w-screen relative pb-3 ml-2 mt-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-full max-w-xs"
                />
              </div> */}
              <div className="overflow-x-auto">
                <table className="table-md min-w-[60%]">
                  {/* head */}
                  <thead className="font-light">
                    <tr>
                      <th></th>
                      <th className="font-light text-neutral-400">Title</th>
                      <th className="font-light text-neutral-400">Artist</th>
                      <th className="font-light text-neutral-400">Album</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr className="text-neutral-300">
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    {/* <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <PausePlay toggleplay={toggleplay} pauseplay={pauseplay} />
        </div>
      </body>
    </>
  );
}
//   const clientId = "2695e07f91b64a2bbc0e4551654a330a";
//   const redirectUri = "http://localhost:5173";
//   const [accessToken, setAccessToken] = useState("");
//   const [player, setPlayer] = useState(null);
//   const [trackName, setTrackName] = useState("");
//   const [artistName, setArtistName] = useState("");
//   const [albumArt, setAlbumArt] = useState("");

//   useEffect(() => {
//     // Extract the access token from the URL hash
//     const hash = window.location.hash.substring(1);
//     const params = new URLSearchParams(hash);
//     const token = params.get("access_token");

//     if (token) {
//       setAccessToken(token);
//     }
//   }, []);

//   useEffect(() => {
//     if (accessToken) {
//       window.addEventListener("load", () => {
//         const hash = window.location.hash.substring(1);

//         if (accessToken) {
//           document.getElementById("login").style.display = "none";
//           document.getElementById("play-pause").style.display = "grid";
//           document.getElementById("player-info").style.display = "block";

//           initializePlayer();
//         }
//       });
//     }
//   }, [accessToken]);

//   const initializePlayer = () => {
//     const spotifyPlayer = new window.Spotify.Player({
//       name: "Web Playback SDK",
//       getOAuthToken: (cb) => {
//         cb(accessToken);
//       },
//     });

//     // Ready
//     spotifyPlayer.addListener("ready", ({ device_id }) => {
//       console.log("Ready with Device ID", device_id);
//       transferPlayback(device_id);
//     });

//     // Not Ready
//     spotifyPlayer.addListener("not_ready", ({ device_id }) => {
//       console.log("Device ID has gone offline", device_id);
//     });

//     // Player state changed
//     spotifyPlayer.addListener("player_state_changed", (state) => {
//       if (!state) return;

//       const currentTrack = state.track_window.current_track;
//       setTrackName(currentTrack.name);
//       setArtistName(currentTrack.artists[0].name);
//       setAlbumArt(currentTrack.album.images[0].url);
//     });

//     spotifyPlayer.connect();
//     setPlayer(spotifyPlayer);
//   };

//   const transferPlayback = (device_id) => {
//     fetch("https://api.spotify.com/v1/me/player", {
//       method: "PUT",
//       body: JSON.stringify({
//         device_ids: [device_id],
//         play: true,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//   };

//   const handleLogin = () => {
//     const scopes =
//       "user-read-playback-state user-modify-playback-state streaming";
//     const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
//       redirectUri
//     )}&scope=${encodeURIComponent(scopes)}`;
//     window.location = authUrl;
//   };

//   const togglePlayPause = () => {
//     player.togglePlay();
//   };

//   return (
//     <div>
//       <h1>Spotify Player</h1>
//       {!accessToken && <button onClick={handleLogin}>Login to Spotify</button>}
//       {accessToken && (
//         <>
//           <button onClick={togglePlayPause}>Play/Pause</button>
//           <div>
//             <h3>{trackName}</h3>
//             <p>{artistName}</p>
//             <img src={albumArt} alt="Album Art" width="200px" />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

export default App;
