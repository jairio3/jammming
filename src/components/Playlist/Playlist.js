import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList.js";

export class Playlist extends React.Component {
  render() {
    let tracks = this.props.playlistTracks;
    let onRemove = this.props.onRemove;
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} />
        <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
