import React from "react";
import "./Track.css";

export class Track extends React.Component {
  renderAction() {
    const isRemoval = false;
    if (isRemoval) {
      return <button className="Track-action">-</button>;
    }
    return <button className="Track-action">+ </button>;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>
            {this.props.artist} | {this.props.album}
          </p>
        </div>
        <button className="Track-action">{/*+ or -*/}</button>
      </div>
    );
  }
}
