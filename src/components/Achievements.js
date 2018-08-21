import React from 'react';

const Achievements = props => {
  const ownedGames = props.ownedGames;
  const listItems = ownedGames.map(game => (
    <li key={game.appid}>
      {game.appid}:{' '}
      {gameList.applist.apps.find(x => x.appid === game.appid).name}
    </li>
  ));

  return <ol>{listItems}</ol>;
};

export default Achievements;
