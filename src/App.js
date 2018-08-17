import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './components/User';
import {
  fetchPlayerSummary,
  fetchVanityURL,
  fetchOwnedGames,
} from './util/steamApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      playerSummary: null,
      success: null,
      games: null,
    };
  }

  handleSubmit = (id, username) => {
    this.setState(() => {
      const newState = {};
      let steamid = '';
      newState[`${id}Name`] = username;
      fetchVanityURL(username)
        .then(steamid64 => {
          this.setState({success: steamid64.success});
          this.steamid = steamid64.steamid;
          return fetchPlayerSummary(steamid64.steamid);
        })
        .then(playerSummary => {
          // newState['playerSummary'] = playerSummary.players[0];
          this.setState({playerSummary: playerSummary.players[0]});
        })
        .then(this.setState({games: fetchOwnedGames(this.steamid)}));
      return newState;
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Steam score calculator</h1>
        </header>
        <div className="App-intro">
          <UserInput
            id="user"
            label="User "
            onSubmit={this.handleSubmit}
            playerSummary={this.state.playerSummary}
            success={this.state.success}
          />
        </div>
      </div>
    );
  }
}

export default App;
