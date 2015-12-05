// Node module dependencies.
// none

/**
 * BasketballStats constructor.
 */
function BasketballStats ( db ) {
    this.db = db;
}

/**
 * Get player info by id
 * @param string playerId The player id to get info for.
 *
 * @return Promise A promise containing the player data when fulfilled.
 */
BasketballStats.prototype.getPlayerInfo = function ( playerId ) {
    return this.db.collection( 'players' ).findOne( { '_id': playerId } );
};

/**
 * Get player season totals for career or by season.
 * @param string playerId The player id to get info for.
 * @param int    seasonId The season to filter by (Optional).
 *
 * @return Promise A promise containing the player season totals when fulfilled.
 */
BasketballStats.prototype.getPlayerSeasonTotals = function ( playerId, seasonId ) {
    var query = { _id: playerId };

    if ( seasonId ) {
        query[ 'totals.' + seasonId ] = { '$exists': true };
    }

    return this.db.collection( 'player_season_totals' ).findOne( query )
        .then( function ( result ) {
            // Filter totals to only the season passed in.
            if ( result && seasonId ) {
                var totals = new Object();
                totals[ seasonId ] = result.totals[ seasonId ];
                result.totals = totals;
            }

            return result;
        } );
};

/**
 * Get player game logs for a season.
 * @param string playerId The player id to get game logs for.
 * @param int    seasonId The season to filter by.
 *
 * @return Promise A promise containing the player game logs by season when fulfilled.
 */
BasketballStats.prototype.getPlayerGameLogs = function ( playerId, seasonId ) {
    var query = {
        _id: {
            playerId: playerId,
            seasonId: seasonId
        }
    };

    return this.db.collection( 'player_game_logs' ).findOne( query );
};

module.exports = BasketballStats;