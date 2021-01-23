import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js";
import { Playlist } from "../Playlist/Playlist.js";
import { Spotify } from "../../util/Spotify.js";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatedPlaylistName = this.updatedPlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  isSaved(track) {
    return this.state.playlistTracks.find((savedTrack) => {
      return savedTrack.id === track.id;
    });
  }

  addTrack(track) {
    if (!this.isSaved(track)) {
      this.setState((state) => {
        let updatedPlaylist = state.playlistTracks.concat(track);
        return {
          playlistTracks: updatedPlaylist,
        };
      });
    }
  }

  removeTrack(track) {
    if (this.isSaved(track)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter((savedTrack) => {
          return savedTrack.id !== track.id;
        }),
      });
    }
  }

  updatedPlaylistName(name) {
    this.setState({ playlistName: name });
  }

  async savePlaylist(name, trackURIs) {
    let resp = await Spotify.savePlaylist(name, trackURIs);
    let isOK;
    try {
      if (resp.ok) {
        isOK = resp.ok;
        console.log(`Playlist saved to Spotify successfully.`);
      }
    } catch (e) {
      console.log(`Save playlist error - ${e}`);
    } finally {
      if (isOK) {
        this.setState({ playlistName: "New Playlist" });
        this.setState({ playlistTracks: [] });
      }
    }
  }

  async search(term) {
    let results = await Spotify.search(term);
    this.setState({ searchResults: results });
  }

  render() {
    let searchResults = this.state.searchResults;
    let playlistTracks = this.state.playlistTracks;
    let playlistName = this.state.playlistName;
    let addTrack = this.addTrack;
    let removeTrack = this.removeTrack;
    let onNameChange = this.updatedPlaylistName;
    let search = this.search;
    let savePlaylist = this.savePlaylist;
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={search} />
          <div className="App-playlist">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
              playlistName={playlistName}
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={onNameChange}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
