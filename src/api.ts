export type SpotifyServiceOptions = {
  songSearch: Function;
  getTop: Function;
  getMe: Function;
  getRecs: Function;
  saveTrack: Function;
};

export const SpotifyServices = (access_token: string) => {
  return {
    songSearch: (query: string) =>
      fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      ),
    getTop: () =>
      fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=short_term`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }),
    getMe: () =>
      fetch(`https://api.spotify.com/v1/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }),
    getRecs: (id: Array<string>) =>
      fetch(
        `https://api.spotify.com/v1/recommendations?seed_tracks=${id.join(
          ","
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      ),
    saveTrack: (id: string) =>
      fetch(
        `https://api.spotify.com/v1/me/tracks
`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            ids: [id],
          }),
        }
      ),
  };
};

//&limit=8
