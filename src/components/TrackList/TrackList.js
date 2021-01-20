import React from "react";
import "./TrackList.css";
import {Track} from '../Track/Track.js';

export class TrackList extends React.Component {
  render() {
    const tracks = this.props.tracks.map(track => {
      return (
        <Track
          key={track.id}
          name={track.name}
          artist={track.artist}
          album={track.album}
        />
      );
    });
    return (
      <div className="TrackList">
        {tracks}
      </div>
    );
  }
}
