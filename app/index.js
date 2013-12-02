'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BasicGenerator = module.exports = function BasicGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'], bower : false });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BasicGenerator, yeoman.generators.Base);

BasicGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
      {
        name    : 'projectName',
        message : 'What would you like to name your project?'
      },
      {
        name    : 'yourName',
        message : 'What is your name?'
      }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.yourName = props.yourName;

    cb();
  }.bind(this));
};

BasicGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('test');

  this.copy('src/_main.js', 'src/' + this.projectName + '.js');

  this.template('_package.json', 'package.json');
  this.template('_LICENSE', 'LICENSE');
  this.template('_README.md', 'README.md');
  this.copy('Gruntfile.js', 'Gruntfile.js');

  this.copy('test/index.html', 'test/index.html');
  this.template('test/_test.js', 'test/test.js');
};

BasicGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
};
