// Node module dependencies.
var MongoClient = require( 'mongodb' ).MongoClient;
var path        = require( 'path' );
var fs          = require( 'fs' );
var utils       = require( '../../utils' );

// Private variables
var app         = utils.getExpressApp();
var apiConfig   = utils.getApiConfig( __dirname );

MongoClient.connect( apiConfig.databaseUrl )
    .then( function ( db ) {
        var endpointDirs = utils.getDirectories( __dirname );
        endpointDirs = endpointDirs.filter( function ( item ) {
            return item !== 'configs';
        } );

        endpointDirs.forEach( function ( endpoint ) {
            var endpointPath       = path.join( __dirname, endpoint );
            var endpointConfigPath = path.join( endpointPath, 'configs', 'endpoint_config.json' );
            var endPointConfig     = JSON.parse( fs.readFileSync( endpointConfigPath, 'utf8' ) );

            if ( !!endPointConfig.enabled ) {
                var router = require( endpointPath + '/router' );
                router( app, db );
            }
        } );
    } )
    .catch( function ( err ) {
        console.log( '### An error has occurred ###', err );
    } );
