export async function fetchPlayerSummary(steamid) {
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

export async function fetchVanityURL(username) {
  const API_KEY = '45B03417198B92B5B46998E904A7B52F';
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

  return data.reponse;
}

export async function fetchOwnedGames(steamid) {
  const API_KEY = '45B03417198B92B5B46998E904A7B52F';
  const URL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json`;

  const init = {
    method: 'get',
    mode: 'cors',
    cache: 'default',
  };

  const data = await (await fetch(URL, init)).json();

  return data.response;
}
