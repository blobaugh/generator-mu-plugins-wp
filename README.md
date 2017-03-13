# generator-mu-plugin-wp

> [Yeoman](http://yeoman.io) generator for the WordPress mu-plugins directory.

### Version: beta0.0.1 ( Not ready for use on a live WordPress site! )

The generator has two main functions.
1. It will create a mu-plugins directory and populate it with a framework from a GitHub repo. For testing it is using https://github.com/jawittdesigns/mu-plugins ( work in progress ).
2. It downloads files from a GitHub repo into the library directory and edited the config.php file in the mu-plugins directory to enable the file. ( using https://github.com/jawittdesigns/code-lib for testing )

## Requirements
1. [NodeJS](https://nodejs.org/en/)
2. [Yeoman](http://yeoman.io)
3. [WordPress](https://wordpress.org/download/)

## Install
1. Clone or download the repo
2. `cd` to the generator-mu-plugins-wp directory.
3. Type `npm link` to allow Yeoman to use the generator.

To use generator-mu-plugin-wp, `cd` to the WordPress wp-content folder and type

```bash
yo mu-plugin-wp
```
## Subgenerators

* `yo plugin-wp:libray` Then choose the file to include from the list prompt.
