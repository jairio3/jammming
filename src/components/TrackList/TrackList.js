import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track.js";

export class TrackList extends React.Component {
  render() {
    let tracks = this.props.tracks.map((track) => {
      return (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
          onAdd={this.props.onAdd}
          isRemoval={this.props.isRemoval}
          track={track}
        />
      );
    });
    return <div className="TrackList">{tracks}</div>;
  }
}
