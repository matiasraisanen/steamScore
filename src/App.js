import React, {Component} from 'react';
import logo from './Steam_icon_logo.svg';
import './App.css';
import UserInput from './components/UserInput';
import PlayerPreview from './components/PlayerPreview';
import GameList from './components/GameList';
import Grid from '@material-ui/core/Grid';
import {getPlayerSummary, getVanityURL, getOwnedGames} from './util/steamApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      steamid: null,
      playerSummary: null,
      success: null,
      ownedGames: null,
    };
  }

  handleSubmit = (id, username) => {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = username;
      getVanityURL(username)
        .then(steamid64 => {
          this.setState({
            success: steamid64.success,
            steamid: steamid64.steamid,
          });
          return getPlayerSummary(steamid64.steamid);
        })
        .then(playerSummary => {
          this.setState({playerSummary: playerSummary.players[0]});
          return getOwnedGames(playerSummary.players[0].steamid);
        })
        .then(ownedGames => {
          this.setState({ownedGames});
        });
      return newState;
    });
  };

  handleReset = event => {
    event.preventDefault();
    this.setState({
      ownedGames: null,
      success: null,
      userName: null,
      playerSummary: null,
      steamid: null,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Steam Score Calculator</h1>
        </header>

        <Grid container spacing={24}>
          {/* <div className="App-intro"> */}
          <Grid item xs={12} sm={12}>
            <UserInput
              id="user"
              label="User "
              onSubmit={this.handleSubmit}
              playerSummary={this.state.playerSummary}
              ownedGames={this.state.ownedGames}
              success={this.state.success}
              handleReset={this.handleReset}
            />
          </Grid>

          {this.state.success === 1 && this.state.ownedGames !== null ? (
            <Grid item xs={12} sm={12}>
              <PlayerPreview
                avatar={
                  this.state.playerSummary.avatarfull !== null &&
                  this.state.playerSummary.avatarfull
                }
                username={this.state.playerSummary.personaname}
                playerSummary={this.state.playerSummary}
                ownedGames={this.state.ownedGames}
                id="player"
              />
              <GameList
                ownedGames={this.state.ownedGames.games}
                steamid={this.state.playerSummary.steamid}
                username={this.state.userName}
              />
            </Grid>
          ) : null}

          {this.state.success === 42 && this.state.ownedGames !== null ? (
            <PlayerPreview
              avatar="https://www.computerhope.com/jargon/e/error.gif"
              username="User not found"
              id="player"
            />
          ) : null}
        </Grid>
      </div>
    );
  }
}

export default App;
