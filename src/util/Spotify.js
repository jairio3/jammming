require("dotenv").config();

const CLIENT_ID = process.env.REACT_APP_API_CLIENT_ID;
//const CLIENT_SECRET = process.env.REACT_APP_API_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000";

let accessToken;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    let windowHref = window.location.href;
    if (
      windowHref.match(/access_token=([^&]*)/) &&
      windowHref.match(/expires_in=([^&]*)/)
    ) {
      accessToken = windowHref.match(/access_token=([^&]*)/);
      let expiresIn = windowHref.match(/expires_in=([^&]*)/);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    }
  },
};
