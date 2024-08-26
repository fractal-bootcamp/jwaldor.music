import { motion, animate, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import { useControls } from "leva";
import { bezier } from "@leva-ui/plugin-bezier";

export default function PausePlay({
  toggleplay,
  pauseplay,
  prevSong,
  nextSong,
}: {
  toggleplay: Function;
  pauseplay: string;
  prevSong: Function;
  nextSong: Function;
}) {
  const [showTitle, setShowTitle] = useState(false);
  const [mouseHover, setMouseHover] = useState(false);
  const { aNumber, aColor, curve } = useControls({
    aNumber: 1,
    aColor: "#FFF",
    curve: bezier(),
  });

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
      <div className="flex flex-row justify-center relative bottom-0">
        <div className="flex flex-col justify-center w-full">
          {/* <div className="card-body"></div> */}
          <motion.div
            // whileHover={{
            //   scale: 1.5,
            //   y: -60,
            //   transition: { ease: "linear" },
            // }}
            animate={controls}
            id="player-info"
            className="mb-3 w-24 self-center"
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
                  src="https://static.vecteezy.com/system/resources/previews/025/220/125/non_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
                  alt="Album Art"
                  width="200px"
                />
              </figure>
            </div>
            {/* <img id="album-art" src="" alt="Album Art" width="200px" /> */}
          </motion.div>
          <div
            className="flex flex-row mb-3 justify-center  p-3 rounded-xl w-fill bg-base-200"
            onMouseEnter={() => {
              const box = document.getElementById("player-info");
              // setShowTitle(true);
              // animate(box, {
              //   scale: 2,
              //   y: -110,
              //   transition: { ease: "easeIn" },
              // });
              controls
                .start({
                  scale: 1.7,
                  y: -70,
                  transition: { ease: curve, duration: 0 },
                })
                .then((res) => {
                  // if (mouseHover) {
                  setShowTitle(true);
                  // }
                });
            }}
            onMouseLeave={() => {
              setShowTitle(false);
              // console.log("setshowtitle false");
              controls
                .start({
                  scale: 1,
                  y: 0,
                  transition: { ease: "linear" },
                })
                .then((res) => setShowTitle(false));
            }}
          >
            <div className="flex flex-col items-center w-1/2">
              <div className="mb-1">
                <div id="track-name" className={"text-xs text-center"}>
                  Track Name
                </div>
                <div id="artist-name" className={"text-xs text-center"}>
                  Artist Name
                </div>
              </div>
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
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </svg>
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
            </div>
          </div>
          {/* <div>
            <div id="track-name" className="text-sm text-center">
              Track Name
            </div>
            <div id="artist-name" className="text-xs text-center">
              Artist Name
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
