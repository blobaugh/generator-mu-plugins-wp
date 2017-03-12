/**
 * Download all the files from the mu-plugins GitHub repo.
 *
 * @summary Get library files.
 *
 * @since 0.0.1
 * @class
 * @classdesc Grab chosen library file and include it in the mu-plugins.
 */
"use strict";

/**
 * Requirements.
 */
var yeoman       = require( 'yeoman-generator' ),
	downloadRepo = require( 'download-git-repo' ),
	mkdirp       = require( 'mkdirp' );

/**
 * The Download the mu-plugins repo.
 *
 * @since 0.0.1
 * @author Jason Witt
 */
module.exports = class extends yeoman{

	/**
	 * Instantiate.
	 * 
	 * @since 0.0.1
 	 * @author Jason Witt
	 */
	init() {

		var destinationPath = process.cwd(),
			muPluginsRepo   = 'jawittdesigns/mu-plugins',
			muPluginsDir    = destinationPath + '/mu-plugins',
			checkDir        = this.fs.exists( muPluginsDir );

		// Check if mu-plugins directory already exists.
		if ( checkDir ) {

			this.log( 'The mu-plugins directory already exists!' );
		} else {

			// make the mu-plugins directory.
			mkdirp.sync( muPluginsDir );

			// Download the files from the Github repo to the mu-plugins directory.
			downloadRepo( muPluginsRepo, muPluginsDir, function( err ) {
				if (err) throw err
			});
		}
	}
};