import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList.js";

export class Playlist extends React.Component {

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    let tracks = this.props.playlistTracks;
    let onRemove = this.props.onRemove;
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
        <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
