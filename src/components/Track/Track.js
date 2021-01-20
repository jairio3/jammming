import React from "react";
import "./Track.css";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <button className="Track-action">-</button>;
    }
    return (
      <button className="Track-action" onClick={this.addTrack}>
        +
      </button>
    );
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  render() {
    let name = this.props.name;
    let artist = this.props.artist;
    let album = this.props.album;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{name}</h3>
          <p>
            {artist} | {album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
