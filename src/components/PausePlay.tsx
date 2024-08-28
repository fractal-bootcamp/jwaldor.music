import { motion, useAnimationControls } from "framer-motion";
import { MouseEventHandler } from "react";
// import { bezier } from "@leva-ui/plugin-bezier";

export default function PausePlay({
  toggleplay,
  pauseplay,
  prevSong,
  nextSong,
  name,
  artists,
  album_art,
  save_song,
}: {
  toggleplay: MouseEventHandler<HTMLButtonElement>;
  pauseplay: string;
  prevSong: MouseEventHandler<HTMLButtonElement>;
  nextSong: MouseEventHandler<HTMLButtonElement>;
  name: string | undefined;
  artists: Array<{ name: string }> | undefined;
  album_art: string | undefined;
  save_song: MouseEventHandler<HTMLButtonElement>;
}) {
  // const [showTitle, setShowTitle] = useState(false);
  // const [mouseHover, setMouseHover] = useState(false);
  // const { aNumber, aColor, curve } = useControls({
  //   aNumber: 1,
  //   aColor: "#FFF",
  //   curve: bezier(),
  // });

  const controls = useAnimationControls();

  // useEffect(() => {
  //   const region = document.getElementById("player-info");
  //   region.addEventListener("mouseover", function (event) {
  //     setMouseHover(true);
  //     // event.target.textContent = "mouse in";
  //     // console.log(isMouseHover);
  //   });
  // }, []);

  // bg-base-200 border-s border-e border-t border-b border-gray-100
  return (
    <>
      {/* <div className="flex flex-row justify-center mt-auto"> */}
      <motion.div
        drag="y"
        dragElastic={1}
        dragConstraints={{ top: -125, bottom: 30 }}
        className="flex justify-center mt-16 sm:mt-auto"
      >
        <div className="flex flex-col justify-center w-full md:mx-10">
          {/* <div className="card-body"></div> */}
          <motion.div
            // whileHover={{
            //   scale: 1.5,
            //   y: -60,
            //   transition: { ease: "linear" },
            // }}
            animate={controls}
            id="player-info"
            className="mb-3 w-24 self-center md:hidden"
          >
            {/* <div>
              <div
                id="track-name"
                className={
                  showTitle ? "text-xs text-center" : "text-transparent"
                }
              >
                Track Name
              </div>
              <div
                id="artist-name"
                className={
                  showTitle ? "text-xs text-center" : "text-transparent"
                }
              >
                Artist Name
              </div>
            </div> */}
            {/*  <h3 id="track-name">Track Name</h3>  */}
            {/* <p id="artist-name">Artist Name</p> */}
            <div className="card-compact  bg-base-100 shadow-xl">
              <figure>
                <img
                  id="album-art"
                  src={
                    album_art
                      ? album_art
                      : "https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                  }
                  alt="Album Art"
                  width="200px"
                />
              </figure>
            </div>
            {/* <img id="album-art" src="" alt="Album Art" width="200px" /> */}
          </motion.div>
          {/* <div className="relative flex justify-center min-w-max"> */}
          <div
            className="flex flex-row mb-3 justify-center  p-3 rounded-xl w-fill bg-base-300 relative md:h-40 items-center"
            onMouseEnter={() => {
              // setShowTitle(true);
              // animate(box, {
              //   scale: 2,
              //   y: -110,
              //   transition: { ease: "easeIn" },
              // });
              controls.start({
                scale: 1.7,
                y: -70,
                transition: { ease: "linear", duration: 0 },
              });
              // .then((res) => {
              //   // if (mouseHover) {
              //   // setShowTitle(true);
              //   // }
              // });
            }}
            onMouseLeave={() => {
              // setShowTitle(false);
              // console.log("setshowtitle false");
              controls.start({
                scale: 1,
                y: 0,
                transition: { ease: "linear" },
              });
              // .then((res) => setShowTitle(false));
            }}
          >
            {/* <img
                className="hidden md:block w-20 h-20 absolute left-10"
                id="album-art"
                src={
                  album_art
                    ? album_art
                    : "https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                }
                alt="Album Art"
              /> */}
            <div className="flex flex-col items-center w-1/2 mt-3">
              <div className="mb-1">
                <div id="track-name" className={"text-xs text-center"}>
                  {name ? (
                    name
                  ) : (
                    <span className="loading loading-bars loading-xs"></span>
                  )}
                </div>
                <div id="artist-name" className={"text-xs text-center mb-2"}>
                  {artists
                    ? artists.map((artist) => artist.name).join(", ")
                    : ""}
                </div>
              </div>
              {/* <div className="flex flex-row relative justify-center"> */}
              <div className="flex flex-row w-full justify-center">
                <button onClick={prevSong}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-circle mx-24"
                  id="play-pause"
                  onClick={toggleplay}
                >
                  {pauseplay === "pause" && (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                      whileHover={{
                        color: "white",
                        transition: { duration: 1 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      // whileInView={{ color: "slate-400" }}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </motion.svg>
                  )}
                  {pauseplay === "play" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                      />
                    </svg>
                  )}
                </button>
                <button onClick={nextSong}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                    />
                  </svg>
                </button>
              </div>
              {/* </div> */}
            </div>
            <button
              onClick={save_song}
              className="tooltip tooltip-success tooltip-right"
              data-tip="Save to your library"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="green"
                className="bi bi-plus-circle-fill absolute top-[43%] right-[15%]"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
            </button>
            <div className="hidden md:block w-24 h-24 absolute left-[4%] top-auto bottom-auto shadow-xl">
              {album_art ? (
                <img
                  className=""
                  id="album-art"
                  src={album_art}
                  alt="Album Art"
                />
              ) : (
                <span className="loading loading-bars loading-md"></span>
              )}
            </div>
          </div>
          {/* </div> */}
          {/* <div>
            <div id="track-name" className="text-sm text-center">
              Track Name
            </div>
            <div id="artist-name" className="text-xs text-center">
              Artist Name
            </div>
          </div> */}
        </div>
      </motion.div>
      {/* </div> */}
    </>
  );
}
