import { useState, useEffect, useRef } from "react";

import PausePlay from "./components/PausePlay";
// import WebPlayback from "./components/WebPlayerSpotify";
import { MouseEventHandler } from "react";
import { useContext } from "react";
import { AccessContext } from "./components/helpers/SpotifyProvider";
import { SpotifyTrack } from './types'; // You'll need to create this type

// Add this new type definition
interface SpotifyPlayerState {
  paused: boolean;
  track_window: {
    current_track: {
      id: string;
      name: string;
      uri: string;
      artists: Array<{ name: string }>;
      album: {
        images: Array<{ url: string }>;
      };
    };
  };
}

import "./App.css";


// Update the TrackType interface
interface TrackType extends SpotifyTrack {
  album_art?: string;
}

function App() {
  // const [accessToken, setAccessToken] = useState("");
  const { accessToken, setAccessToken, SpotifyServices } =
    useContext(AccessContext);
  const [player, setPlayer] = useState<undefined | Object>();
  const [currentsonginfo, setCurrentSongInfo] = useState<TrackType>();
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(null);
  const playerRef = useRef(undefined);
  const [pauseplay, setPP] = useState<"play" | "pause">("play");
  const [searchVal, setSearchVal] = useState("");
  // const [apiServices, setApiServices] = useState<
  //   undefined | SpotifyServiceOptions
  // >(undefined);
  const [songTable, setSongTable] = useState(Array<TrackType>);
  const [recList, setRecList] = useState<Array<TrackType>>();
  // const [topItems, setTopItems] = useState(Array<TrackType>);
  const [recentlySaved, setRecentlySaved] = useState<Array<string>>([]);
  // const navigate = useNavigate();

  // const [topItems, setTopItems] = useState(
  //   Array<{ name: string; artists: Array<Object>; uri: string }>
  // );

  // const [is_active, setActive] = useState(false);

  const clientId = "2695e07f91b64a2bbc0e4551654a330a";
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;

  const apiServices = SpotifyServices;

  // function seekSong()

  useEffect(() => {
    console.log("apiservices changed");
    if (apiServices) {
      console.log(apiServices, "apiServices");
      console.log(apiServices.getTop);
      apiServices
        .getTop()
        .then((res: Response) => {
          if (res.status === 401) {
            window.location.href = import.meta.env.VITE_REDIRECT_URI;
          }
        })
        .catch((error: Error) => console.log("error", error));
      // .catch((error) => {
      //   console.log("error", error);
      //   // window.location.href = import.meta.env.VITE_REDIRECT_URI;
      // });
      // setTopItems(apiServices.getTop());
      // apiServices.getMe().then((res) => console.log("getme", res));
    }
  }, [apiServices]);

  // useEffect(() => {
  //   setApiServices(SpotifyServices(accessToken));
  //   console.log("set Api services");
  // }, [accessToken]);

  const save_song: MouseEventHandler<HTMLButtonElement> = () => {
    console.log("called");
    if (playerState && apiServices) {
      const current_id = playerState.track_window.current_track.id;
      console.log("saving song");
      apiServices.saveTrack(current_id);
      setRecentlySaved([...recentlySaved, current_id]);
    } else {
      console.error("save_song failed stuff not defined");
    }
  };

  const songSetup = () => {
    // if (player.state)
    if (playerState) {
      const currentTrack = playerState.track_window.current_track;
      // document.getElementById("track-name").innerText = currentTrack.name;
      // document.getElementById("artist-name").innerText =
      //   currentTrack.artists[0].name;
      // document.getElementById("album-art").src = currentTrack.album.images[0]
      //   .url
      //   ? currentTrack.album.images[0].url
      //   : "https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg";
      setCurrentSongInfo({
        name: currentTrack.name,
        artists: currentTrack.artists,
        album_art: currentTrack.album.images[0].url,
        id: currentTrack.id, // Added id
        uri: currentTrack.uri, // Added uri
      });
      console.log("songSetup ");
    }
  };
  const refreshRecommendations = () => {
    if (playerState) {
      console.log(
        "refresh",
        playerState.track_window.current_track.id,
        apiServices
      );
      if (apiServices && recentlySaved.length > 0) {
        console.log("calling API");
        apiServices
          .getRecs(recentlySaved)
          .then((res: Response) => res.json())
          .then((res: any) => {
            setRecList(res.tracks.slice(0, 5));
            setSongTable(res.tracks.slice(0, 5));
          });
        // .then((res) => console.log(res.values()));
      }
    }
  };
  useEffect(() => {
    if (playerState) {
      // console.log("player state defined", playerState);
      setPP(playerState.paused ? "pause" : "play");
    }
    songSetup();
  }, [playerState]);

  useEffect(() => refreshRecommendations(), [recentlySaved]);

  useEffect(() => {
    console.log("apiservices changed");
    if (apiServices) {
      console.log(apiServices, "apiServices");
      console.log(apiServices.getTop);
      apiServices
        .getTop()
        .then((res: Response) => res.json())
        .then((res: any) => {
          // setTopItems(res.items);
          setSongTable(res.items.slice(0, 5));
          console.log("set song table");
        });
      // .catch((error) => {
      //   console.log("error", error);
      //   // window.location.href = import.meta.env.VITE_REDIRECT_URI;
      // });
      // setTopItems(apiServices.getTop());
      // apiServices.getMe().then((res) => console.log("getme", res));
    }
  }, [apiServices]);

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
      // document.getElementById("login").style.display = "none";
      // document.getElementById("play-pause").style.display = "grid";
      // document.getElementById("player-info").style.display = "block";

      initializePlayer(access_temp);
    }
    // return () => {
    //   if (player) {
    //     player.removeListener("ready");
    //     player.removeListener("not_ready");
    //     player.removeListener("player_state_changed");
    //   }
    // };
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

    // if (localStorage["device_id"]) {
    //   transferPlayback(device_id, access_token);
    // }
    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      if (!playerRef.current) {
        console.log("calling spotify");
        // const user = new (window as any).Spotify.Users({
        //   name: "Web Playback SDK",
        //   getOAuthToken: (cb: Function) => {
        //     cb(access_token);
        //   },
        //   volume: 0.5,
        // });
        // console.log("user", user);
        const player = new (window as any).Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb: Function) => {
            cb(access_token);
          },
          volume: 0.5,
        });
        if (!player) {
          console.log("player initializatin failed");
        }
        // Ready
        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          console.log("Ready with Device ID", device_id);
          localStorage["device_id"] = device_id;
          transferPlayback(device_id, access_token);
        });

        // Not Ready
        player.addListener(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            console.log("Device ID has gone offline", device_id);
          }
        );

        // Player state changed
        player.addListener("player_state_changed", (state: SpotifyPlayerState) => {
          console.log("player state changed");
          if (!state) {
            return;
          }
          console.log("curr_state", state);
          // console.log("state", playerState.paused);
          setPlayerState(state);
        });

        // Extract the access token from the URL hash
        // window.addEventListener("load", () => {
        player.on(
          "initialization_error",
          ({ message }: { message: string }) => {
            console.error("Failed to initialize", message);
          }
        );
        player.on(
          "authentication_error",
          ({ message }: { message: string }) => {
            console.error("Failed to authenticate", message);
          }
        );
        player.on("account_error", ({ message }: { message: string }) => {
          console.error("Failed to validate Spotify account", message);
        });
        player.on("playback_error", ({ message }: { message: string }) => {
          console.error("Failed to perform playback", message);
        });

        // document.getElementById("play-pause").addEventListener("click", () => {
        //   console.log("toggle play");
        //   player.togglePlay();
        // });

        player.connect();
        console.log("set player");
        setPlayer(player);
        playerRef.current = player;
        console.log("player set");
      }

      // songSetup(player.getCurrentState());
    };
  }

  function transferPlayback(device_id: string, access_token: string) {
    console.log("access_token", access_token);
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

  function transferPlaybackSong(uri: string) {
    console.log("access_token", accessToken);
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      body: JSON.stringify({
        uris: [uri],
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // setPP("play");
  }

  const toggleplay = () => {
    console.log("toggleplay ", player);
    if (player) {
      console.log("if accepted", "pauseplay", pauseplay);
      if (pauseplay === "play") {
        console.log("pausing");
        (player as any).pause();
        // setPP("pause");
      } else if (pauseplay === "pause") {
        console.log("playing");
        (player as any).resume();
        // setPP("play");
      }
    }
  };
  // Type 'Function' is not assignable to type 'MouseEventHandler<HTMLButtonElement>'.
  // Type 'Function' provides no match for the signature '(event: MouseEvent<HTMLButtonElement, MouseEvent>): void'.ts(2322)

  const nextSong: MouseEventHandler<HTMLButtonElement> = () => {
    // console.log("toggleplay ", player);
    if (player) {
      console.log("next song");
      (player as any).nextTrack();
    }
  };
  const prevSong: MouseEventHandler<HTMLButtonElement> = () => {
    // console.log("toggleplay ", player);
    if (player) {
      console.log("previous song");
      (player as any).previousTrack();
    }
  };
  return (
    <>
      {/* <div id="player-info">
          <h3 id="track-name">Track Name</h3>
          <p id="artist-name">Artist Name</p>
          <img id="album-art" src="" alt="Album Art" width="200px" />
        </div>
        <h1>Spotify Player</h1> */}
      {/*
        <ul className="menu w-[20%] rounded-l-none rounded-br-none rounded-tr-lg bg-base-300">
          <li className="menu-title font-light">Recommended</li>
          <li className="font-light">
            <a>Higher Love</a>
          </li>
          <li className="font-light">
            <a>Purple Lamborghini</a>
          </li>
          <li className="menu-title font-light">More</li>
          <li className="font-light">
            <a>Higher Love</a>
          </li>
          <li className="font-light">
            <a>Purple Lamborghini</a>
          </li>
          <li className="menu-title font-light">More</li>
          <li className="font-light">
            <a>Higher Love</a>
          </li>
          <li className="font-light">
            <a>Purple Lamborghini</a>
          </li>
        </ul> */}
      {/* <div className="flex flex-row"> */}
      {/* {(recList ? recList.length > 0 : false) && (
        <ul className="menu max-h-sm pb-28 rounded-l-none rounded-br-none rounded-tr-lg bg-base-300 shadow-lg mt-3 bg-gradient-to-r from-base-300 to-transparent min-w-fit">
          <li className="menu-title font-light">
            Recommendations based on recently saved
          </li>

          {(recList ? recList : []).map((item) => (
            <li className="font-light">
              <a>
                <div>
                  <button
                    onClick={() => {
                      transferPlaybackSong(item.uri);
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white bg-green-800 rounded-full"
                      aria-hidden="false"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 18V6l8 6-8 6Z"
                      />
                    </svg>{" "}
                    {item.name}
                  </button>
                </div>
              </a>
            </li>
          ))}

          <li className="font-light">
            <a>Purple Lamborghini</a>
          </li>
          <li className="menu-title font-light">More</li>
          <li className="font-light">
            <a>Higher Love</a>
          </li>
          <li className="font-light">
            <a>Purple Lamborghini</a>
          </li>
          <li className="menu-title font-light">More</li>
          <li className="font-light">
            <a>Higher Love</a>
          </li>
          <li className="font-light">
            <a>Purple Lamborghini</a>
          </li>
        </ul>
      )} */}

      {!accessToken && (
        <button
          id="login"
          onClick={() => {
            const scopes =
              "user-read-playback-state user-modify-playback-state streaming user-top-read user-read-private user-read-email user-library-modify";
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
              redirectUri
            )}&scope=${encodeURIComponent(
              scopes
            )}&grant_type=authorization_code`;
            (window as any).location = authUrl;
          }}
        >
          Login to Spotify
        </button>
      )}
      {accessToken && (
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-row ">
            {/* <div className="bg-gradient-to-r from-base-300 to-inherit shadow-lg pr-4 rounded-r-lg w-20"> */}
            <a className="btn btn-ghost text-xl pr-1 pl-2">Music</a>
            {/* </div> */}

            <div className="max-h-screen">
              {/* <div className="flex-grow"> */}
              <div className="">
                <div className="flex-none gap-2"></div>
              </div>
              <div className="flex flex-row text-blue-200">
                {/* <div className="flex flex-col w-[20%] mr-10 mt-10 relative min-h-[100%]"> */}
                {/* </div> */}
                <div className="flex flex-col">
                  <div className="flex">
                    <div className="form-control ml-2 mt-2">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          console.log("search happening");
                          if (apiServices) {
                            apiServices
                              .songSearch(searchVal)
                              .then((res: Response) => {
                                console.log("res", res);
                                return res.json();
                              })
                              .then((res: Response) =>
                                setSongTable((res as any).tracks.items)
                              );
                          }
                        }}
                      >
                        <input
                          value={searchVal}
                          onChange={(e) => setSearchVal(e.target.value)}
                          type="text"
                          placeholder="Search"
                          className="input input-bordered ml-2 mt-!"
                        />
                      </form>
                    </div>

                    {/* <div className="dropdown dropdown-end">
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
                      </div> */}
                  </div>

                  <div className="min-h-[80%] w-full flex flex-col ">
                    <div className="card card-side">
                      <table className="table-sm">
                        {/* head */}
                        {/* <div className="font-light">
                        <tr>
                          <th></th>
                          <th className="font-light text-neutral-400">Title</th>
                          <th className="font-light text-neutral-400">
                            Artist
                          </th>
                        </tr>
                      </div> */}
                        <tbody>
                          {/* row 1 */}
                          {/* <div className="text-neutral-300 bg-base-300 my-4 rounded-lg flex flex-row items-center h-12 w-28 pl-3">
                          <div>Songs</div>
                        </div> */}
                          {/* <div className="bg-base-300"> */}
                          <div className="card-body bg-base-100 text-slate-400 w-40 h-16 justify-center text-left mt-2">
                            <h2 className="card-title">
                              {recList ? "Recommended items" : "Top songs"}
                            </h2>
                          </div>
                          {/* </div> */}
                          {songTable.length > 0 ? (
                            songTable.map((song: any) => (
                              // <button>
                              <div className="text-neutral-300 bg-base-300 mb-4 rounded-full flex flex-row items-center">
                                <th>
                                  <button
                                    onClick={() => {
                                      transferPlaybackSong(song.uri);
                                    }}
                                  >
                                    <svg
                                      className="w-6 h-6 text-gray-800 dark:text-white bg-green-800 rounded-full mt-1 ml-1"
                                      aria-hidden="false"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 18V6l8 6-8 6Z"
                                      />
                                    </svg>
                                  </button>
                                </th>
                                <div>
                                  <td className=" text-slate-300 font-light">
                                    {song.name}
                                  </td>
                                  <td className="text-slate-400 font-light">
                                    {song.artists && song.artists
                                      .map((artist: any) => artist.name)
                                      .join(", ")}
                                  </td>{" "}
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="loading loading-bars loading-md"></span>
                          )}
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
              </div>
              {/* </div> */}
            </div>
            {/* {!is_active && (
            <div className="container">
              <div className="main-wrapper">
                <b>
                  {" "}
                  Instance not active. Transfer your playback using your Spotify
                  app{" "}
                </b>
              </div>
            </div>
          )}
          {is_active && (
            <div className="container">
              <div className="main-wrapper">
                <b> Active!</b>
              </div>
            </div>
          )} */}
          </div>
          <PausePlay
            toggleplay={toggleplay}
            pauseplay={pauseplay}
            prevSong={prevSong}
            nextSong={nextSong}
            name={currentsonginfo ? currentsonginfo.name : undefined}
            artists={currentsonginfo ? currentsonginfo.artists : undefined}
            album_art={currentsonginfo ? currentsonginfo.album_art : undefined}
            save_song={save_song}
          />
        </div>
      )}
      {/* </div> */}
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
