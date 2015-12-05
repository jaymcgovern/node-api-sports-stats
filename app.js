// NPM modules
var express = require( 'express' );
var path    = require( 'path' );
var fs      = require( 'fs' );

// App
var app     = module.exports = express();
var env     = app.get( 'env' );
var utils   = require( './utils' );

// Add apis
var apisDirPath = path.join( __dirname, 'apis' );
var apiDirs     = utils.getDirectories( apisDirPath );

apiDirs.forEach( function ( api ) {
    var apiPath       = path.join( apisDirPath, api );
    var apiConfigPath = path.join( apiPath, 'configs', 'api_config.json' );
    var apiConfig     = JSON.parse( fs.readFileSync( apiConfigPath, 'utf8' ) );

    if ( !!apiConfig.enabled ) {
        require( apiPath + '/controller' );
    }
} );
