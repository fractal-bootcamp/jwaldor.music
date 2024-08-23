export default function PausePlay({
  toggleplay,
  pauseplay,
}: {
  toggleplay: Function;
  pauseplay: string;
}) {
  console.log(pauseplay, "pauseplay");
  return (
    <>
      <div className="flex flex-row m-auto justify-center place-items-center">
        <div id="player-info" className="w-24 mr-16 mb-3 self-center">
          {/*  <h3 id="track-name">Track Name</h3>  */}
          {/* <p id="artist-name">Artist Name</p> */}
          <div className="card-compact  bg-base-100 w-36 shadow-xl">
            <div className="card-body">
              <h2
                id="track-name"
                className="card-title static text-lg text-center"
              >
                Track Name
              </h2>
              <p id="artist-name" className="text-sm text-center">
                Artist Name
              </p>
            </div>
            <figure>
              <img id="album-art" src="" alt="Album Art" width="200px" />
            </figure>
          </div>
          {/* <img id="album-art" src="" alt="Album Art" width="200px" /> */}
        </div>
        <div className="flex flex-row mt-auto mb-3 justify-self-center justify-center border border-gray-100 p-3 rounded-xl w-[30%]">
          <button>
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
            className="btn btn-circle"
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
          <button>
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
    </>
  );
}
