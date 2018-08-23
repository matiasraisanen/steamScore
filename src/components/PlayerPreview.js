import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from '@material-ui/core/Chip';

// PlayerPreview displays a Card with player summary data

const PlayerPreview = props => {
  return (
    <div>
      <Card style={{margin: 'auto', width: 250, marginBottom: 10}}>
        <CardMedia>
          <img src={props.avatar} alt="kuva" />
        </CardMedia>
        <CardTitle
          title={props.username}
          subtitle={props.playerSummary.realname}
        />

        {props.ownedGames.game_count !== 0 &&
        props.playerSummary.communityvisibilitystate === 3 ? (
          <CardText>
            Games owned: <Chip label={props.ownedGames.game_count} />
          </CardText>
        ) : props.playerSummary.communityvisibilitystate === 1 ? (
          <CardText>
            <span style={{color: 'red'}}>Private profile</span>
          </CardText>
        ) : null}
      </Card>
    </div>
  );
};

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default PlayerPreview;
