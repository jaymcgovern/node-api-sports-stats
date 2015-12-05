// NPM module dependencies
var path = require( 'path' );
var fs   = require( 'fs' );

/**
 * Utilities object that provides various reusable functions across the app.
 */
var Utils = {
    /**
     * Gets the running express app instance.
     * @param object The express app instance.
     */
    getExpressApp: function () {
        return require( path.dirname( require.main.filename ) + '/../app' );
    },

    /**
     * Get the sub directories of a directory.
     * @param string srcPath The path to return sub directories from.
     *
     * @return Array An array of array of filenames.
     */
    getDirectories: function ( srcPath ) {
        try {
            return fs.readdirSync( srcPath ).filter( function ( file ) {
                return fs.statSync( path.join( srcPath, file ) ).isDirectory();
            } );
        } catch ( e ) {
            return [];
        }
    },

    /**
     * Get the JSON config for the API.
     * @param string dirPath The directory that contains the config.
     *
     * @return JSON The json config object.
     */
    getApiConfig : function ( dirPath ) {
        return _getConfig( dirPath, 'api_config.json' );
    },

    /**
     * Get the JSON config for the end point.
     * @param string dirPath The directory that contains the config.
     *
     * @return JSON The json config object.
     */
    getEndpointConfig : function ( dirPath ) {
        return _getConfig( dirPath, 'endpoint_config.json' );
    }
}

// Private functions

/**
 * Get the JSON config by path.
 * @param string dirPath  The directory that contains the config.
 * @param string fileName The name of the config file.
 *
 * @return JSON The json config object.
 */
function _getConfig ( dirPath, fileName ) {
    return JSON.parse( fs.readFileSync( path.join( dirPath, 'configs', fileName ) ) );
}

module.exports = Utils;