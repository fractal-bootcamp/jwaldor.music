export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  artists: Array<{ name: string }>;
}