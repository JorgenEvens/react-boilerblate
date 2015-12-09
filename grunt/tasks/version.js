"use strict";

module.exports = function(grunt) {
    var updateFragment = function( i ) {
            var pkg = grunt.config.get('pkg');
            var version = pkg.version.split('.');

            version[i]++;
            while( ++i < 3 )
            version[i] = 0;

            version = version.join('.');

            pkg.version = version;
            grunt.file.write('package.json', JSON.stringify(pkg, null, 4));

            grunt.file.expand('src/Application/*.json').forEach(function(i){
                var json = grunt.file.readJSON(i);
                json.Application.Version = version;
                grunt.file.write(i, JSON.stringify(json,null,4));
            })
        },
        update = function(i) {
            return function() { return updateFragment(i); }
        };

    grunt.registerTask('version-major', update(0));
    grunt.registerTask('version-minor', update(1));
    grunt.registerTask('version-patch', update(2));
}
