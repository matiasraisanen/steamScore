import React from 'react';
import gameList from '../util/appList.json';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';

import {getUserStatsForGame} from '../util/steamApi';

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      appid: '',
      gamename: '',
      played: '',
      achievementsTotal: '',
    };
  }

  handleClickOpen = (appid, gamename, played, steamid) => {
    this.setState({
      open: true,
      loading: true,
      appid,
      gamename,
      played,
      achievementsTotal: '  ',
    });
    getUserStatsForGame(appid, steamid).then(response => {
      try {
        this.setState({achievementsTotal: response.achievements.length});
      } catch (err) {
        this.setState({achievementsTotal: 0});
      }
      return this.setState({loading: false});
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    var ownedGames = this.props.ownedGames;
    ownedGames.map(
      o => (o.name = gameList.applist.apps.find(x => x.appid === o.appid).name),
    );

    var sortedGames = _.sortBy(ownedGames, ['name']);

    const listItems = sortedGames.map(game => (
      <div key={game.appid}>
        <ListItem
          button
          onClick={e =>
            this.handleClickOpen(
              game.appid,
              game.name,
              ownedGames.find(x => x.appid === game.appid).playtime_forever,
              this.props.steamid,
              e,
            )
          }
          key={game.appid}
        >
          <ListItemText>
            {game.name} (AppID: {game.appid})
          </ListItemText>
        </ListItem>
        <Divider />
      </div>
    ));

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.gamename}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Stats for {this.props.username}.<br />
              Playtime: <Chip label={this.state.played} color="primary" /> min.
              <br />
              Achievements:
              {this.state.loading === true ? (
                <CircularProgress />
              ) : (
                <Chip label={this.state.achievementsTotal} color="primary" />
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <h1>Games list</h1>
        <List style={{maxWidth: 460, margin: 'auto'}}>{listItems}</List>
      </div>
    );
  }
}

export default GameList;
