const API_KEY = '45B03417198B92B5B46998E904A7B52F';

export async function getPlayerSummary(steamid) {
  // Returns basic profile information for a list of 64-bit Steam IDs.
  // Returns:

  // players: [
  //   {
  //     steamid: "76561197968554278",
  //     communityvisibilitystate: 3,
  //     profilestate: 1,
  //     personaname: "skofdo",
  //     lastlogoff: 1535056087,
  //     commentpermission: 1,
  //     profileurl: "https://XX/id/skofdo/",
  //     avatar: "https://XX.jpg",
  //     avatarmedium: "https://XX.jpg",
  //     avatarfull: "https://XX.jpg",
  //     personastate: 1,
  //     realname: "Matias",
  //     primaryclanid: "103582791433666638",
  //     timecreated: 1093784483,
  //     personastateflags: 0,
  //     loccountrycode: "FI",
  //     locstatecode: "13",
  //     loccityid: 15440
  //   }
  // ]

  const URL = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${API_KEY}&steamids=${steamid}`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();
  return data.response;
}

export async function getVanityURL(username) {
  // Get the steamID of a certain vanity url.
  // Returns:

  // {
  //   steamid: "76561197968554278",
  //   success: 1
  // }
  const URL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${username}`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();
  return data.response;
}

export async function getOwnedGames(steamid) {
  // Get a list of owned games by steam ID.
  // Returns:
  // {
  //  game_count: 266,
  //  games: [
  //     {
  //      appid: 10,
  //      playtime_forever: 13
  //     },
  //  ]
  //}

  const URL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();
  return data.response;
}

export async function getAppList() {
  // Get a full list of steam apps. Not recommended, as the list is huge.
  const URL = 'http://api.steampowered.com/ISteamApps/GetAppList/v2';

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();
  return data.applist.apps;
}

export async function getSchemaForGame(appid) {
  // GetSchemaForGame returns gamename, gameversion and availablegamestats(achievements and stats).
  // Returns:

  //{
  // gameName: "Bloodstained: Curse of the Moon",
  // gameVersion: "5",
  // availableGameStats: {
  // achievements: [
  //    {
  //     name: "NEW_ACHIEVEMENT_1_0",
  //     defaultvalue: 0,
  //     displayName: "Nightmare's End",
  //     hidden: 1,
  //     icon: "https://XX.jpg",
  //     icongray: "https://XX.jpg"
  //   },
  // ]
  //}

  const URL = `http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${API_KEY}&appid=${appid}`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();
  return data.game;
}

export async function getUserStatsForGame(appid, steamid) {
  // Fetch user's achievements
  // Returns:

  //{
  // steamID: "76561197968554278"
  // gameName: "Bloodstained: Curse of the Moon"
  // achievements: [
  //   name: "NEW_ACHIEVEMENT_1_1"
  //   achieved: 0 / 1
  // ]
  //}
  const URL = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${API_KEY}&steamid=${steamid}`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();
  return data.playerstats;
}

export async function getGlobalAchievementPercentagesForApp(appid) {
  // Fetch achievement percentages for a game.
  // Returns:

  //{
  // [
  //   {
  //     name: "NEW_ACHIEVEMENT_1_7",
  //     percent: 75
  //   },
  //   {
  //     name: "NEW_ACHIEVEMENT_1_8",
  //     percent: 60.5
  //   }
  // ]
  //}

  const URL = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${appid}&format=json`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();
  return data.achievementpercentages.achievements;
}

export async function getPlayerScoreForGame(appid, steamid) {
  var percentages = await getGlobalAchievementPercentagesForApp(appid);
  var userAchis = (await getUserStatsForGame(appid, steamid)).achievements;
  var userAchiNames = [];
  var userScore = 0;

  if (userAchis) {
    for (let item of userAchis) {
      userAchiNames.push(item['name']);
    }

    // console.log(percentages);
    // console.log(userAchis);
    // console.log(userScore);

    for (let item of percentages) {
      if (userAchiNames.includes(item['name'])) {
        var scoreAddition = 100 / item['percent'];
        userScore = userScore + scoreAddition;
        // console.log(`Adding ${scoreAddition} to userscore`);
      }
    }
  }
  userScore = Math.round(userScore);
  // console.log(userScore);
  return userScore;
}

export async function getPlayerScoreForListOfGames(steamid, games) {
  var scores = 0;
  var appids = [];

  try {
    for (let item of games) {
      appids.push(item['appid']);
    }

    for (let id of appids) {
      var scoreToAdd;
      try {
        scoreToAdd = await getPlayerScoreForGame(id, steamid);
      } catch (err) {
        scoreToAdd = 0;
      }
      scores = scores + scoreToAdd;
    }
  } catch (err) {
    null;
  }

  return scores;
}
