import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Info from '@material-ui/icons/Info';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import {getPlayerScoreForListOfGames} from '../util/steamApi';

// PlayerPreview displays a Card with player summary data

class PlayerPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingScores: true,
      achiScores: 0,
      scoringHelpOpen: false,
    };
  }

  componentDidMount() {
    getPlayerScoreForListOfGames(
      this.props.playerSummary.steamid,
      this.props.ownedGames.games,
    ).then(response => {
      this.setState({achiScores: response});
      return this.setState({loadingScores: false});
    });
  }

  handleScoringHelpClickOpen = () => {
    this.setState({
      scoringHelpOpen: true,
    });
  };

  handleScoringHelpClose = () => {
    this.setState({scoringHelpOpen: false});
  };

  render() {
    return (
      <div>
        <Card style={{margin: 'auto', width: 250, marginBottom: 10}}>
          <CardMedia>
            <img src={this.props.avatar} alt="kuva" />
          </CardMedia>
          <CardTitle
            title={this.props.username}
            subtitle={this.props.playerSummary.realname}
          />

          {this.props.ownedGames.game_count !== 0 &&
          this.props.playerSummary.communityvisibilitystate === 3 ? (
            <CardText>
              Games owned:{' '}
              <Chip
                label={
                  this.props.ownedGames.game_count
                    ? this.props.ownedGames.game_count
                    : 0
                }
              />
              <br />
              Total achievement score:
              {this.state.loadingScores === true ? (
                <CircularProgress />
              ) : (
                <Chip label={this.state.achiScores} />
              )}
              <br />
              <br />
              <Chip
                color="primary"
                label="How is score calculated?"
                avatar={
                  <Avatar>
                    <Info />
                  </Avatar>
                }
                onClick={this.handleScoringHelpClickOpen}
              />
            </CardText>
          ) : this.props.playerSummary.communityvisibilitystate === 1 ? (
            <CardText>
              <span style={{color: 'red'}}>Private profile</span>
            </CardText>
          ) : null}
        </Card>

        <Dialog
          open={this.state.scoringHelpOpen}
          onClose={this.handleScoringHelpClose}
          aria-labelledby="Scoring"
          aria-describedby="Scoring"
        >
          <DialogTitle id="Scoring">Scoring</DialogTitle>
          <DialogContent>
            <DialogContentText id="Scoring">
              All achievements the player has attained have a base value of 100
              points. This value is then divided by the rarity percentage of the
              achievement. <br />
              <br />
              For example, an achievement that has been attained by 5% of the
              people who have played the game, scores you a total of 100pts / 5
              = 20 points. <br />
              <br />
              The more games the player has, the longer it takes to calculate
              the score, as each game has to be calculated individually.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleScoringHelpClose}
              color="primary"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default PlayerPreview;
