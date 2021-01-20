import React from "react";
import "./TrackList.css";
import {Track} from '../Track/Track.js';

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        <Track name="The Bay" artist="Metronomy" album="The English Riviera"/>
        <Track name="The Bay" artist="Metronomy" album="The English Riviera"/>
        <Track name="The Bay" artist="Metronomy" album="The English Riviera"/>
      </div>
    );
  }
}
