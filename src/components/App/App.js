import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";

const TRACK_1 = {
  name: "The Bay",
  artist: "Metronomy",
  album: "The English Riviera",
};

const TRACK_2 = {
  name: "The Look",
  artist: "Metronomy",
  album: "The English Riviera",
};

const PLAYLIST_NAME = "Jam's Playlist";
const SEARCH_RESULTS = [TRACK_1, TRACK_1, TRACK_1, TRACK_1, TRACK_1];
const PLAYLIST_TRACKS = [TRACK_2, TRACK_2, TRACK_2, TRACK_2, TRACK_2];

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: SEARCH_RESULTS,
      playListName: PLAYLIST_NAME,
      playlistTracks: PLAYLIST_TRACKS,
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const saved = this.state.playlistTracks.find((savedTrack) => {
      return savedTrack.id === track.id;
    });
    if (saved) {
      this.setState((state) => {
        const updatedPlaylist = state.playlistTracks.concat(track);
        return {
          playlistTracks: updatedPlaylist
        }
      });
    }
  }

  render() {
    let searchResults = this.state.searchResults;
    let playlistTracks = this.state.playlistTracks;
    let playlistName = this.state.playlistName;
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playListName={playlistName}
              playlistTracks={playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}
