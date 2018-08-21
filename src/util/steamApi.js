const API_KEY = '45B03417198B92B5B46998E904A7B52F';

export async function getPlayerSummary(steamid) {
  const API_KEY = '45B03417198B92B5B46998E904A7B52F';
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
  const URL = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${username}`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();

  // if (data.response.success === 1) {
  //   return data.response.steamid;
  // } else {
  //   return 'No match';
  // }

  return data.response;
}

export async function getOwnedGames(steamid) {
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
  const URL = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appid}&key=${API_KEY}&steamid=${steamid}`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();

  return data.playerstats;
}
