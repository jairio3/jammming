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
      accessToken = getAccessToken;
      let getExpirationDate = Number(expirationDateInfo[1]);

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
  async savePlaylist(name, trackURIs) {
    name = name || "My Playlist";
    let userAccessToken = this.getAccessToken();
    let headers = { authorization: `Bearer ${userAccessToken}` };
    let userID;

    let profileResponse = await fetch("https://api.spotify.com/v1/me/", {
      headers: headers,
    }).then((response) => {
      return response.json();
    });

    userID = profileResponse.id;
    let playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: name }),
      }
    );
    return playlistResponse;
  },
};
