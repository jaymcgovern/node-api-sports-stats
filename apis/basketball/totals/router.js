// Node module dependencies.
var express     = require( 'express' );
var utils       = require( '../../../utils' );

// Private variables.
var router          = express.Router();
var BasketballStats = require( '../../../data-sources/BasketballStats' );
var config          = utils.getEndpointConfig( __dirname );

/**
 * The Basketball API's totals router.
 * @param object The express app.
 * @param Db     The mongodb database instance.
 */
function Router ( app, db ) {
    var stats = new BasketballStats( db );

    /**
     * Gets player season totals by player id and an optional season id.
     *
     * ex. http://api.com/v/1/totals/curryst01/2016
     */
    router.get( '/v/' + config.version + '/' + config.id + '/:playerId/:seasonId?', function ( req, res, next ) {
        var playerId = req.params.playerId ? req.params.playerId : null;
        var seasonId = req.params.seasonId ? req.params.seasonId : null;

        if ( playerId ) {
            stats.getPlayerSeasonTotals( playerId, seasonId )
                .then( function ( result ) {
                    res.json( { success: true, data: result } );
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
