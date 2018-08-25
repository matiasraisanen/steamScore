# Steam Score Calculator

### JavaScript application for calculating steam achievement score

## Usage

Insert a Steam user's custom URL, and the application returns that user's game list.  
Application then calculates the user's "Steam Score" according to the following formula:  

Attained achievements score 100 base points for the user. This value is then divided by the achievement's rarity percentage.  
For an example, an achievement which has been attained by 5% of the game's players, scores 100pts / 5 = 20pts.

Application makes API calls for each achievement of each game in the user's library, and returns an accumulated score value of these games.

The player must have set up their custom URL for the search function to work.  
Custom URL can be set up [here](http://steamcommunity.com/my/edit/) in Steam profile settings.  
Profile must also have its privacy settings set to public.

# Uses [Steam Web API](https://steamcommunity.com/dev) for fetching player data.
## Following API calls in use:
1. getPlayerSummary

   Returns basic profile information for a list of 64-bit Steam IDs.

2. getVanityURL

   Returns the Steam ID by a user's custom URL.

3. getOwnedGames

   Returns a list of owned games, and also total game count.

4. getSchemaForGame

   Returns game name, game version and available game stats (achievements and stats).

5. getUserStatsForGame

   Returns the user's achievements for a certain game.

6. getGlobalAchievementPercentagesForApp  

   Return the achievement percentages for a certain game.


## Live link

You can try the application [here](http://renki.dy.fi/steamscore/).  
If you don't have a profile set up for yourself, you can do a search for **skofdo**, which is me. 😎
