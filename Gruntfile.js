process.env['NODE_PATH'] = '.:' + __dirname + '/src';

var _ = require('lodash');
var path = require('path');

process.env.NODE_PATH = [
    '.',
    __dirname,
    path.join(__dirname, '/src')
].join(path.delimiter);
require('module').Module._initPaths();

module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    _(pkg.devDependencies)
        .keys()
        .filter(function(i) { return /^grunt(ify)?-/.test(i); })
        .map(grunt.loadNpmTasks)
        .run();

    _(grunt.file.expand(__dirname + '/grunt/tasks/*.js'))
        .map(require)
        .each(function(task) { task(grunt); })
        .run();

    grunt.initConfig(_.merge.apply(_,
        _(grunt.file.expand(__dirname + '/grunt/config/*.js'))
        .map(require)
        .map(function(config) { return _.isFunction(config) ? config(grunt) : config; })
        .value()
        .concat({ pkg: pkg })
    ));

    // Build
    grunt.registerTask('.build-dev', ['env:dev', 'webpack-dev-server']);
    grunt.registerTask('.build-prod', ['env:prod', 'webpack']);

    // Deploy
    grunt.registerTask('version', ['is-clean', 'version-patch', 'gitcommit:version', 'git-tag', 'gitpush:version']);
    grunt.registerTask('retry', ['.build-prod', 'ftp-deploy'] );
    grunt.registerTask('deploy',['.build-prod', 'version', 'ftp-deploy']);

    // Development
    grunt.registerTask('default', ['.build-dev']);

};
