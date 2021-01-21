require("dotenv").config();

const CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/callback/";
let accessToken;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    let windowHref = window.location.href;
    let hasAccessToken = windowHref.match(/access_token=([^&]*)/);
    let hasExpirationDate = windowHref.match(/expires_in=([^&]*)/);

    if (hasAccessToken && hasExpirationDate) {
      let getAccessToken = hasAccessToken[1];
      let getExpirationDate = Number(hasExpirationDate[1]);
      accessToken = getAccessToken;
      window.setTimeout(() => (accessToken = ""), getExpirationDate * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    }
  },
  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      });
  },
};
