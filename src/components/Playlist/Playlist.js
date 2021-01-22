import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList.js";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  handleClick() {
    let trackURIs = this.props.playlistTracks.map( track => { return track.uri });
    this.props.onSave(this.props.playlistName, trackURIs);
  }

  render() {
    let tracks = this.props.playlistTracks;
    let onRemove = this.props.onRemove;
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
        <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
        <button className="Playlist-save" onClick={this.handleClick}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}
