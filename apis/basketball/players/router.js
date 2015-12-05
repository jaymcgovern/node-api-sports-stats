// Node module dependencies.
var express     = require( 'express' );
var utils       = require( '../../../utils' );

// Private variables.
var router          = express.Router();
var BasketballStats = require( '../../../data-sources/BasketballStats' );
var config          = utils.getEndpointConfig( __dirname );

/**
 * The Basketball API's players router.
 * @param object The express app.
 * @param Db     The mongodb database instance.
 */
function Router ( app, db ) {
    var stats = new BasketballStats( db );

    /**
     * Gets player info by player id
     *
     * ex. http://api.com/v/1/players/curryst01
     */
    router.get( '/v/' + config.version + '/' + config.id + '/:playerId', function ( req, res, next ) {
        var playerId = req.params.playerId ? req.params.playerId : null;

        if ( playerId ) {
            stats.getPlayerInfo( playerId )
                .then( function ( playerInfo ) {
                    res.json( { success: true, data: playerInfo } );
                } )
                .catch( function ( err ) {
                    res.json( { success: false, data: null, error: err } );
                } );
        }
    } );

    /**
     * Gets player game logs for a season.
     *
     * ex. http://api.com/v/1/players/games/curryst01/2016
     */
    router.get( '/v/' + config.version + '/' + config.id + '/games/:playerId/:seasonId' , function ( req, res, next ) {
        var playerId = req.params.playerId ? req.params.playerId : null;
        var seasonId = req.params.seasonId ? req.params.seasonId : null;

        if ( playerId && seasonId ) {
            stats.getPlayerGameLogs( playerId, seasonId )
                .then( function ( playerGameLogs ) {
                    res.json( { success: true, data: playerGameLogs } );
                } )
                .catch( function ( err ) {
                    res.json( { success: false, data: null, error: err } );
                } );
        }
    } );

    // Bind router to Express instance
    app.use( '/', router );
}

module.exports = Router;
