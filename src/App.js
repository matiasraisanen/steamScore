import React, {Component} from 'react';
import logo from './Steam_icon_logo.svg';
import './App.css';
import UserInput from './components/UserInput';
import PlayerPreview from './components/PlayerPreview';
import GameList from './components/GameList';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  getPlayerSummary,
  getVanityURL,
  getOwnedGames,
  getPlayerScoreForGame,
} from './util/steamApi';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      userName: '',
      steamid: null,
      playerSummary: null,
      success: null,
      ownedGames: null,
      loading: false,
    };
  }

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit = (id, username, steamid64) => {

    var newState = {};

    if (username) {
    this.handleReset()
      .then(this.setState({loading: true}))
      .then(
        this.setState(() => {
          
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
              try {
                return getOwnedGames(playerSummary.players[0].steamid);
              } catch (err) {
                return {game_count: 0, games: [{appid: 0, name: 'N/A'}]};
              }
            })
            .then(ownedGames => {
              this.setState({ownedGames, loading: false});
            });
          return newState;
        }),
      );

    } else if (steamid64) {
      this.handleReset()
      .then(this.setState({loading: true}))
      .then(
        this.setState(() => {
          
          newState[`${id}Name`] = username;
          newState["steamid"] = steamid64;
          getPlayerSummary(steamid64)
            .then(playerSummary => {
              console.log(playerSummary.players.length)

              if (playerSummary.players.length === 0) {
                newState["success"] = 42;
                console.log("fail")
                console.log(newState)
              } else {
                newState["success"] = 1;
                console.log("success")
              };

              this.setState({playerSummary: playerSummary.players[0]});
              try {
                return getOwnedGames(playerSummary.players[0].steamid);
              } catch (err) {
                return {game_count: 0, games: [{appid: 0, name: 'N/A'}]};
              }
            })
            .then(ownedGames => {
              this.setState({ownedGames, loading: false});
            });
          console.log(newState);
          return newState;
        }),
      );
    }
  };

  calculateScore = (appid, steamid) => {
    getPlayerScoreForGame(appid, steamid);
  };

  handleReset = async () => {
    this.setState({
      ownedGames: null,
      success: null,
      userName: null,
      playerSummary: null,
      steamid: null,
      loading: false,
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

          {this.state.loading === true ? (
            <Grid item xs={12} sm={12}>
              <CircularProgress />
            </Grid>
          ) : null}

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
              {this.state.playerSummary.communityvisibilitystate === 3 && (
                <GameList
                  ownedGames={this.state.ownedGames.games}
                  steamid={this.state.playerSummary.steamid}
                  username={this.state.userName}
                />
              )}
            </Grid>
          ) : null}

          {this.state.success === 42 && this.state.ownedGames !== null ? (
            <Grid item xs={12} sm={12}>
              <PlayerPreview
                avatar="./error.gif"
                username="User not found"
                ownedGames={this.state.ownedGames}
                playerSummary={[{realname: ''}]}
                id="player"
              />
            </Grid>
          ) : null}

          <Grid item xs={12} sm={12}>
            <Chip
              color="primary"
              label="Help"
              avatar={
                <Avatar>
                  <Info />
                </Avatar>
              }
              onClick={this.handleClickOpen}
            />
          </Grid>
        </Grid>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="Help"
          aria-describedby="Help"
        >
          <DialogTitle id="Help">Help</DialogTitle>
          <DialogContent>
            <DialogContentText id="Help">
              Username search works by looking up the player's custom url. <br/>Setup your
              custom URL here:{' '}
              <a href="http://steamcommunity.com/my/edit/">
                http://steamcommunity.com/my/edit/
              </a>
              <br /><br />
              SteamID64 search works by looking up the user's SteamID64, which is the 17 digit ID on a profile's URL:<br/>
              https://steamcommunity.com/profiles/<span style={{color: "red"}}>76561197968554278</span>/
              <br /><br />
              Also, you must edit your privacy settings and make the profile
              public.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
