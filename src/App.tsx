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
  console.log("test222");
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

  useEffect(() => {}, []);

  function initializePlayer(access_token: string) {
    const player = new Spotify.Player({
      name: "Web Playback SDK",
      getOAuthToken: (cb) => {
        cb(access_token);
      },
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
      document.getElementById("album-art").src =
        currentTrack.album.images[0].url;
    });

    // document.getElementById("play-pause").addEventListener("click", () => {
    //   console.log("toggle play");
    //   player.togglePlay();
    // });

    player.connect();
    setPlayer(player);
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
        <div>
          <h1>Spotify Player</h1>
          <button id="login">Login to Spotify</button>
          <div className="flex flex-row min-w-[100%] relative left-60 pb-3">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex flex-row text-blue-200">
            <div className="flex flex-col">
              <ul className="menu bg-base-200 rounded-box w-56">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col min-h-screen max-h-screen">
              <div className="overflow-x-auto min-w-">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <PausePlay toggleplay={toggleplay} pauseplay={pauseplay} />
            </div>
          </div>
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
