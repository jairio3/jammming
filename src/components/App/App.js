import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";

const TRACK = {
  name: 'The Bay',
  artist: 'Metronomy',
  album: 'The English Riviera'
}

const SEARCHRESULTS = [TRACK, TRACK, TRACK, TRACK, TRACK]

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: SEARCHRESULTS
    };
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}
