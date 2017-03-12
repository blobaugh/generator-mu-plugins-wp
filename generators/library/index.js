/**
 * This subgenerator grabs the files in the libray GitHub repo,
 * then allows you to add the file and update the config file
 * for the choosen library file.
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
	downloadFile = require( 'download-file' ),
	XMLHttpRequest = require( 'xmlhttprequest' ).XMLHttpRequest;

/**
 * The main mu-plugins-wp functionality.
 *
 * @since 0.0.1
 * @author Jason Witt
 */
module.exports = class extends yeoman{

	/**
	 * Build the choices array from the Github repo response data.
	 *
	 * @since 0.0.1
 	 * author Jason Witt
 	 * 
	 * @return array The choices array.
	 */
	_choices() {

		// Get the github repo response.
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://api.github.com/repos/jawittdesigns/code-lib/contents/", false);
		xhr.send();

		var requests    = xhr.responseText,
			namesLength = requests.length,
			jsonData    = JSON.parse(requests),
			choices     = [];

		// Loop through the GitHub repo response.
		for ( var i = 0; i < jsonData.length; i++ ) {

			var data       = jsonData[i],
				dataName   = data.name,
				prefix     = dataName.replace( /class-wds-wpmu-/g, '' ),
				ext        = prefix.replace( /.php/g, '' ),
				hyphen     = ext.replace( /-/g, ' ' ),
				capitalize = hyphen.replace( /\b\w/g, function( l ){ return l.toUpperCase() } );

			// Add to the choices array.
			choices[i] = {
				name: capitalize,
				value: dataName
			}
		}

		return choices;
	}

	/**
	 * Get the library file and update the config file.
	 *
	 * @since 0.0.1
 	 * author Jason Witt
 	 *
 	 * $param string The answer to the prompt.
	 */
	_getFile( answer ) {

		var repo         = 'jawittdesigns/code-lib',
			targetURL    = 'https://raw.githubusercontent.com/' + repo + '/master/' + answer,
			basePath     = process.cwd(),
			targetDir    = basePath + '/includes/libaray',
			targetFile   = basePath + '/config.php',
			targetString = '\t\t' + '// Include Library Components.',
			answerPrefix = answer.replace( /class-wds-wpmu-/g, '' ),
			answerClean  = answerPrefix.replace( /.php/g, '' ),
			newString    = "\t\t" + "'" + answerClean + "' => true," + "\n\t\t" + "// Include Library Components.",
			content      = this.fs.read( targetFile ),
			updated      = content.replace( targetString, newString ),
			file         = answer,
			checkFile    = this.fs.exists( targetDir + '/' + file ),
			options      = {
				directory: targetDir
			};

		// Check if file already exists.
		if ( checkFile ) {

			this.log( file + ' is already included!' );
		} else {

			// Download the file.
			downloadFile( targetURL, options, function( err ){
				if (err) throw err
			});

			// Update the config file.
			this.fs.write( targetFile, updated );
		}
	}

	/**
	 * Pront the user for which component to install
	 *
	 * @since 0.0.1
 	 * author Jason Witt
	 */
	prompting() {

		var $this       = this,
			choices     = this._choices();

		// Execute the prompt. 
		this.prompt( 
			[ 
				{
					type: 'list',
					name: 'include',
					message: 'Which component would you like to include?',
					choices: choices
				} 
			] 
		).then( (answers) => {
			
			var answer = answers.include;

			// Get the library file and update the config file.
			$this._getFile( answer );
		});
	}
};
