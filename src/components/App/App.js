import React from "react";
import "./App.css";
//import SearchBar
//import SearchResults
//impoort Playlist

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Ja<span class="highlight">mmm</span>ing
        </h1>
        <div class="App">
          {/*<SearchBar/>*/}
          <div class="App-playlist">
            {/*<SearchResults/>*/}
            {/*<Playlist/>*/}
          </div>
        </div>
      </div>
    );
  }
}