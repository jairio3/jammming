require("dotenv").config();

const CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000/";
let accessToken;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    let windowHref = window.location.href;
    let accessTokenInfo = windowHref.match(/access_token=([^&]*)/);
    let expirationDateInfo = windowHref.match(/expires_in=([^&]*)/);

    if (accessTokenInfo && expirationDateInfo) {
      let getAccessToken = accessTokenInfo[1];
      let getExpirationDate = Number(expirationDateInfo[1]);
      accessToken = getAccessToken;
      window.setTimeout(() => {
        accessToken = "";
        window.history.pushState("Access Token", null, "/");
      }, getExpirationDate * 1000);
      return accessToken;
    }
    if (!accessTokenInfo && !expirationDateInfo) {
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    }
  },
  search(term) {
    let userAccessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${userAccessToken}`,
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
  savePlaylist(name, trackURIs) {
    name = name || "My Playlist";
    let userID;
    return fetch("https://api.spotify.com/v1/me/", {
      headers: { authorization: `Bearer ${this.getAccessToken()}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: "POST",
          headers: { authorization: `Bearer ${this.getAccessToken()}` },
          body: JSON.stringify({ name: name }),
        });
      });
  },
};
